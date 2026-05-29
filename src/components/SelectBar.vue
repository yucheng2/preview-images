<script setup lang="ts">
import { computed } from 'vue'
import { useSelectionStore } from '../stores/selection'
import { copyToClipboard, downloadAsTxt } from '../utils/clipboard'

const props = defineProps<{
  allPaths: string[]
}>()

const store = useSelectionStore()

const hasSelection = computed(() => store.selectedCount > 0)

function handleSelectAll() {
  store.selectAll(props.allPaths)
}

function handleCopyPaths() {
  const paths = store.getSelectedPaths()
  if (paths.length === 0) {
    return
  }
  const text = paths.join('\n')
  copyToClipboard(text)
}

function handleDownloadTxt() {
  const paths = store.getSelectedPaths()
  if (paths.length === 0) {
    return
  }
  const content = paths.join('\n')
  downloadAsTxt(content, 'selected_paths.txt')
}
</script>

<template>
  <div class="flex items-center gap-3 flex-wrap">
    <button
      class="px-4 py-2 text-sm rounded-md transition-colors"
      :class="allPaths.length > 0 && allPaths.every(p => store.isSelected(p))
        ? 'bg-red-100 text-red-700 hover:bg-red-200'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
      @click="handleSelectAll"
    >
      {{ allPaths.length > 0 && allPaths.every(p => store.isSelected(p)) ? '取消全选' : '全选' }}
    </button>

    <span v-if="store.selectedCount > 0" class="text-sm text-blue-600">
      已选择 {{ store.selectedCount }} 项
    </span>

    <button
      :disabled="!hasSelection"
      class="px-4 py-2 text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-100 text-blue-700 hover:bg-blue-200"
      @click="handleCopyPaths"
    >
      复制路径
    </button>

    <button
      :disabled="!hasSelection"
      class="px-4 py-2 text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-100 text-green-700 hover:bg-green-200"
      @click="handleDownloadTxt"
    >
      下载 TXT
    </button>

    <button
      v-if="hasSelection"
      class="px-4 py-2 text-sm rounded-md transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
      @click="store.clearSelection()"
    >
      清除选择
    </button>
  </div>
</template>
