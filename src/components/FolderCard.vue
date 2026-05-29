<script setup lang="ts">
import { computed } from 'vue'
import { useSelectionStore } from '../stores/selection'

const props = defineProps<{
  name: string
  path: string
}>()

const store = useSelectionStore()
const isSelected = computed(() => store.isSelected(props.path))

function handleClick(e: MouseEvent) {
  e.stopPropagation()
  if (e.ctrlKey || e.metaKey) {
    store.toggleSelect(props.path)
  }
}

function handleDoubleClick() {
  store.setCurrentPath(props.path)
}
</script>

<template>
  <div
    class="relative group rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg cursor-pointer bg-gray-50 flex flex-col items-center justify-center p-4"
    :class="isSelected ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-200'"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <svg class="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
    <span class="mt-2 text-sm text-gray-600 px-2 text-center truncate w-full">{{ name }}</span>
    <div
      v-if="isSelected"
      class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
    >
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
</template>
