import type { ImageSize } from '../types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSelectionStore = defineStore('selection', () => {
  const selectedPaths = ref<Set<string>>(new Set())
  const imageSize = ref<ImageSize>('medium')
  const rootPath = ref<string>('')
  const currentPath = ref<string>('')

  const selectedCount = computed(() => selectedPaths.value.size)

  function toggleSelect(path: string) {
    if (selectedPaths.value.has(path)) {
      selectedPaths.value.delete(path)
    }
    else {
      selectedPaths.value.add(path)
    }
    selectedPaths.value = new Set(selectedPaths.value)
  }

  function selectAll(paths: string[]) {
    const allSelected = paths.every(p => selectedPaths.value.has(p))
    if (allSelected) {
      paths.forEach(p => selectedPaths.value.delete(p))
    }
    else {
      paths.forEach(p => selectedPaths.value.add(p))
    }
    selectedPaths.value = new Set(selectedPaths.value)
  }

  function isSelected(path: string): boolean {
    return selectedPaths.value.has(path)
  }

  function clearSelection() {
    selectedPaths.value = new Set()
  }

  function setImageSize(size: ImageSize) {
    imageSize.value = size
  }

  function setRootPath(path: string) {
    rootPath.value = path
    currentPath.value = path
    clearSelection()
  }

  function setCurrentPath(path: string) {
    currentPath.value = path
  }

  function getSelectedPaths(): string[] {
    return Array.from(selectedPaths.value)
  }

  return {
    selectedPaths,
    imageSize,
    rootPath,
    currentPath,
    selectedCount,
    toggleSelect,
    selectAll,
    isSelected,
    clearSelection,
    setImageSize,
    setRootPath,
    setCurrentPath,
    getSelectedPaths,
  }
})
