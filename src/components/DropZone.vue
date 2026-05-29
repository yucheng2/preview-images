<script setup lang="ts">
import { ref } from 'vue'
import { useSelectionStore } from '../stores/selection'

const emit = defineEmits<{
  folderSelected: [path: string]
}>()

const store = useSelectionStore()
const isDragging = ref(false)
const manualPath = ref('')

async function handleSelectFolder() {
  const selectedPath = await window.electronAPI.selectFolder()
  if (selectedPath) {
    manualPath.value = selectedPath
    emit('folderSelected', selectedPath)
  }
}

function handleManualSubmit() {
  if (manualPath.value.trim()) {
    emit('folderSelected', manualPath.value.trim())
  }
}
</script>

<template>
  <div class="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 border-gray-300 hover:border-gray-400">
    <div v-if="!store.rootPath" class="space-y-4">
      <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <p class="text-gray-600 font-medium">
        选择或输入文件夹路径
      </p>

      <div class="flex items-center gap-2 justify-center mt-4 max-w-xl mx-auto">
        <input
          v-model="manualPath"
          type="text"
          placeholder="例如: /Users/name/Pictures"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          @keyup.enter="handleManualSubmit"
        >
        <button
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          @click="handleSelectFolder"
        >
          选择文件夹
        </button>
        <button
          class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          @click="handleManualSubmit"
        >
          打开
        </button>
      </div>
    </div>

    <div v-else class="space-y-3">
      <svg class="w-10 h-10 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-gray-700">
        当前目录:
      </p>
      <p class="font-mono text-sm bg-gray-100 px-4 py-2 rounded-lg break-all">
        {{ store.rootPath }}
      </p>
      <div class="flex items-center gap-2 justify-center mt-4 max-w-xl mx-auto">
        <input
          v-model="manualPath"
          type="text"
          placeholder="输入新路径更换目录"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          @keyup.enter="handleManualSubmit"
        >
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          @click="handleSelectFolder"
        >
          选择文件夹
        </button>
        <button
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          @click="handleManualSubmit"
        >
          更换
        </button>
      </div>
    </div>
  </div>
</template>
