<script setup lang="ts">
import { computed } from 'vue'
import { useSelectionStore } from '../stores/selection'

const props = defineProps<{
  path: string
}>()

const store = useSelectionStore()

const crumbs = computed(() => {
  if (!props.path || !store.rootPath)
    return []

  const relativePath = props.path.replace(store.rootPath, '').replace(/^\//, '')
  if (!relativePath)
    return [{ name: store.rootPath.split('/').pop() || store.rootPath, path: store.rootPath }]

  const segments = relativePath.split('/')
  const items = [{ name: store.rootPath.split('/').pop() || store.rootPath, path: store.rootPath }]

  let currentPath = store.rootPath
  for (const segment of segments) {
    currentPath += `/${segment}`
    items.push({ name: segment, path: currentPath })
  }

  return items
})

function navigateTo(path: string) {
  store.setCurrentPath(path)
}
</script>

<template>
  <nav v-if="crumbs.length > 0" class="flex items-center gap-1 text-sm text-gray-500 mb-4 flex-wrap">
    <template v-for="(crumb, index) in crumbs" :key="crumb.path">
      <span v-if="index > 0" class="text-gray-300">/</span>
      <button
        v-if="index < crumbs.length - 1"
        class="hover:text-blue-600 cursor-pointer transition-colors"
        @click="navigateTo(crumb.path)"
      >
        {{ crumb.name }}
      </button>
      <span v-else class="text-gray-800 font-medium">
        {{ crumb.name }}
      </span>
    </template>
  </nav>
</template>
