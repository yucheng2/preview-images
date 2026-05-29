<script setup lang="ts">
defineProps<{
  items: any[]
  cols?: number
  gap?: number
}>()

function getColumnItems(items: any[], cols: number) {
  const columns: any[][] = Array.from({ length: cols }, () => [])

  for (let i = 0; i < items.length; i++) {
    columns[i % cols].push(items[i])
  }

  return columns
}
</script>

<template>
  <div class="flex" :style="{ gap: (gap || 16) + 'px' }">
    <div
      v-for="(col, colIdx) in getColumnItems(items, cols || 4)"
      :key="colIdx"
      class="flex-1 flex flex-col"
      :style="{ gap: (gap || 16) + 'px' }"
    >
      <div v-for="(item, itemIdx) in col" :key="itemIdx">
        <slot :item="item" :index="itemIdx" />
      </div>
    </div>
  </div>
</template>
