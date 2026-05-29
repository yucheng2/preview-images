<script setup lang="ts">
import { computed } from 'vue'
import { useSelectionStore } from '../stores/selection'

const props = defineProps<{
  name: string
  path: string
}>()

const store = useSelectionStore()

const isSelected = computed(() => store.isSelected(props.path))

const imageSrc = computed(() => {
  return `local-image://${props.path}`
})

function handleClick(e: MouseEvent) {
  e.stopPropagation()
  store.toggleSelect(props.path)
}
</script>

<template>
  <div
    class="relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg"
    :class="isSelected ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-200'"
    @click="handleClick"
  >
    <div class="bg-gray-100 flex items-center justify-center overflow-hidden">
      <img
        :src="imageSrc"
        :alt="name"
        class="w-full h-auto transition-transform duration-200 group-hover:scale-105"
        loading="lazy"
      >
    </div>
    <div class="p-2 text-xs text-gray-600 truncate">
      {{ name }}
    </div>
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
