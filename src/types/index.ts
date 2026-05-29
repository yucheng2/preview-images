import type { FileType } from '../types'

export type { FileType }

export interface FileItem {
  name: string
  path: string
  type: FileType
}

export type ImageSize = 'small' | 'medium' | 'large' | 'xlarge'

export const IMAGE_SIZES: Record<ImageSize, number> = {
  small: 100,
  medium: 200,
  large: 300,
  xlarge: 400,
}

export const IMAGE_SIZE_LABELS: Record<ImageSize, string> = {
  small: '小',
  medium: '中',
  large: '大',
  xlarge: '特大',
}
