export interface ElectronAPI {
  listDirectory: (dirPath: string) => Promise<import('./index').FileItem[]>
  selectFolder: () => Promise<string | null>
  getImagePath: (filePath: string) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
