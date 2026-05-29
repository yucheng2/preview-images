import type { FileItem } from '../src/types'
import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'])

function isImageFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return IMAGE_EXTENSIONS.has(ext)
}

function listDirectory(dirPath: string): FileItem[] {
  const results: FileItem[] = []

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.name.startsWith('.')) {
        continue
      }

      const fullPath = path.join(dirPath, entry.name)

      if (entry.isDirectory()) {
        results.push({
          name: entry.name,
          path: fullPath,
          type: 'folder',
        })
      }
      else if (isImageFile(entry.name)) {
        results.push({
          name: entry.name,
          path: fullPath,
          type: 'image',
        })
      }
    }
  }
  catch (err) {
    console.error('Error listing directory:', err)
  }

  return results.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') {
      return -1
    }
    if (a.type !== 'folder' && b.type === 'folder') {
      return 1
    }
    return a.name.localeCompare(b.name)
  })
}

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: '图片预览',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  }
  else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('local-image', (request, callback) => {
    const filePath = decodeURIComponent(request.url.replace('local-image://', ''))
    callback({ path: filePath })
  })

  ipcMain.handle('list-directory', async (_, dirPath: string) => {
    if (!dirPath) {
      throw new Error('Missing path parameter')
    }

    const resolvedPath = path.resolve(dirPath)

    if (!fs.existsSync(resolvedPath)) {
      throw new Error('Directory not found')
    }

    const stat = fs.statSync(resolvedPath)
    if (!stat.isDirectory()) {
      throw new Error('Not a directory')
    }

    return listDirectory(resolvedPath)
  })

  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })

    if (result.canceled || result.filePaths.length === 0) {
      return null
    }

    return result.filePaths[0]
  })

  ipcMain.handle('get-image-path', async (_, filePath: string) => {
    const resolvedPath = path.resolve(filePath)
    if (!fs.existsSync(resolvedPath)) {
      throw new Error('File not found')
    }
    return resolvedPath
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
