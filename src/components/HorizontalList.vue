<template>
  <ul class="horizontal-list">
    <li
        v-for="i in props.cols"
        :id="`${props.rowId}_${i}`"
        :key="i"
        ref="squareRefs"
        class="horizontal-list-item"
    >
      <Square :square-id="`${props.rowId}_${i}`"/>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import Square from './Square.vue'
import { onMounted, onUnmounted, ref } from "vue";
import useSquareObserver from "../composables/useSquareObserver.ts";

const squareRefs = ref<null | HTMLElement[]>(null)
const { addObserver, removeObserver } = useSquareObserver()

const props = defineProps<{
  rowId: number,
  cols: number
}>()
onMounted(() => {
  if (squareRefs.value) {
    squareRefs.value.forEach(ref => addObserver(ref))
  }
})
onUnmounted(() => {
  if (squareRefs.value) {
    squareRefs.value.forEach(ref => removeObserver(ref))
  }
})
</script>

<style></style>