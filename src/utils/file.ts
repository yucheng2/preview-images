import type { FileType } from '../types'

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'])

export function isImageFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return IMAGE_EXTENSIONS.has(ext)
}

export function getFileType(filename: string): FileType {
  return isImageFile(filename) ? 'image' : 'folder'
}

export function getAbsoluteUrl(path: string): string {
  return new URL(path, window.location.origin).href
}

export function joinPaths(base: string, relative: string): string {
  if (base === '/') {
    return `/${relative}`
  }
  return `${base}/${relative}`
}
