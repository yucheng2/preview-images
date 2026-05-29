<script setup lang="ts">
import type { ImageSize } from '../types'
import { useSelectionStore } from '../stores/selection'
import { IMAGE_SIZE_LABELS, IMAGE_SIZES } from '../types'

const store = useSelectionStore()

const sizes: ImageSize[] = ['small', 'medium', 'large', 'xlarge']
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-500">图片大小:</span>
    <div class="flex gap-1">
      <button
        v-for="size in sizes"
        :key="size"
        class="w-20 py-1 text-sm rounded-md transition-colors text-center"
        :class="store.imageSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="store.setImageSize(size)"
      >
        {{ IMAGE_SIZE_LABELS[size] }} ({{ IMAGE_SIZES[size] }})
      </button>
    </div>
  </div>
</template>
