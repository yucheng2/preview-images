import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  listDirectory: (dirPath: string) => ipcRenderer.invoke('list-directory', dirPath),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  getImagePath: (filePath: string) => ipcRenderer.invoke('get-image-path', filePath),
})
