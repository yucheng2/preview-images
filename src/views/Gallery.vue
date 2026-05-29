<script setup lang="ts">
import type { FileItem } from '../types'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import DropZone from '../components/DropZone.vue'
import FolderCard from '../components/FolderCard.vue'
import ImageCard from '../components/ImageCard.vue'
import ImageSizeSelector from '../components/ImageSizeSelector.vue'
import SelectBar from '../components/SelectBar.vue'
import WaterfallLayout from '../components/WaterfallLayout.vue'
import { useSelectionStore } from '../stores/selection'
import { IMAGE_SIZES } from '../types'

const store = useSelectionStore()
const { imageSize } = storeToRefs(store)

const items = ref<FileItem[]>([])
const loading = ref(false)
const error = ref('')
const displayCount = ref(40)
const isLoadingMore = ref(false)

async function loadDirectory(dirPath: string) {
  loading.value = true
  error.value = ''
  displayCount.value = 40
  try {
    items.value = await window.electronAPI.listDirectory(dirPath)
  }
  catch (err: any) {
    error.value = err.message || '加载失败'
    items.value = []
  }
  finally {
    loading.value = false
  }
}

function handleFolderSelected(path: string) {
  store.setRootPath(path)
}

const folders = computed(() => items.value.filter(item => item.type === 'folder'))
const images = computed(() => items.value.filter(item => item.type === 'image'))
const allPaths = computed(() => items.value.map(item => item.path))

const visibleFolders = computed(() => folders.value.slice(0, displayCount.value))
const visibleImages = computed(() => images.value.slice(0, displayCount.value))

const hasMore = computed(() => displayCount.value < Math.max(folders.value.length, images.value.length))

const columnWidth = computed(() => IMAGE_SIZES[imageSize.value])

const colCount = computed(() => {
  const w = columnWidth.value
  if (w <= 100) return 8
  if (w <= 200) return 5
  if (w <= 300) return 3
  return 2
})

function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  if (!target) return
  const { scrollTop, scrollHeight, clientHeight } = target
  if (scrollTop + clientHeight >= scrollHeight - 300 && hasMore.value && !isLoadingMore.value) {
    isLoadingMore.value = true
    setTimeout(() => {
      displayCount.value += 20
      isLoadingMore.value = false
    }, 300)
  }
}

onMounted(() => {
  if (store.rootPath) {
    loadDirectory(store.currentPath)
  }
})

watch(() => store.currentPath, (newPath) => {
  if (newPath) {
    loadDirectory(newPath)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        图片预览
      </h1>

      <DropZone @folder-selected="handleFolderSelected" />

      <div v-if="store.rootPath" class="mt-6">
        <Breadcrumb :path="store.currentPath" />

        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <ImageSizeSelector />
          <SelectBar :all-paths="allPaths" />
        </div>

        <div v-if="loading" class="text-center py-12 text-gray-500">
          加载中...
        </div>

        <div v-else-if="error" class="text-center py-12 text-red-500">
          {{ error }}
        </div>

        <div v-else-if="items.length === 0" class="text-center py-12 text-gray-500">
          此目录为空
        </div>

        <div v-else class="overflow-auto" style="height: 70vh" @scroll="handleScroll">
          <div v-if="visibleFolders.length > 0" class="mb-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">
              文件夹 ({{ folders.length }})
            </h2>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="folder in visibleFolders"
                :key="folder.path"
                :style="{ width: columnWidth + 'px', flexShrink: 0 }"
              >
                <FolderCard :name="folder.name" :path="folder.path" />
              </div>
            </div>
          </div>

          <div v-if="visibleImages.length > 0">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">
              图片 ({{ images.length }})
            </h2>
            <WaterfallLayout :items="visibleImages" :cols="colCount" :gap="16">
              <template #default="{ item }">
                <ImageCard :name="item.name" :path="item.path" />
              </template>
            </WaterfallLayout>
          </div>

          <div v-if="isLoadingMore" class="text-center py-8 text-gray-500">
            加载更多...
          </div>

          <div v-else-if="!hasMore && items.length > 0" class="text-center py-8 text-gray-400">
            没有更多了
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
