<template>
  <ul
      class="horizontal-list"
      @mouseover="handleMouseover"
      @mouseleave="handleMouseleave"
  >
    <li v-for="i in props.cols" :key="i" >
      <Square :row-id="props.rowId" :square-id="i"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Square from './Square.vue'
import {store} from "../store.ts";

const props = defineProps<{
  rowId: number,
  cols: number
}>()
type SquareEl = HTMLElement | null
const handleMouseover = (event: MouseEvent) => {
  const square: SquareEl = (event.target as HTMLElement).closest('.square')
  if (square) {
    store.hoveredSquare = `${props.rowId}_${square.dataset.squareId}`
  }
}

const handleMouseleave = (event: MouseEvent) => {
  const square: SquareEl = (event.target as HTMLElement).closest('.square')
  if (square) {
    const squareId = `${props.rowId}_${square.dataset.squareId}`
    if (store.hoveredSquare === squareId) {
      store.hoveredSquare = null
    }
  }
}
</script>

<style scoped>
.horizontal-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 1px;
}
</style>