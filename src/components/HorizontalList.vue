<template>
  <ul class="horizontal-list">
    <li
        v-for="i in props.cols"
        :id="`${props.rowId}_${i}`"
        :key="i"
        ref="squareRefs"
        class="horizontal-list-item"
    >
      <div v-show="store.visibleSquares[`${props.rowId}_${i}`]" ref="numberRefs" class="square">
        {{ numberForSquare(props.rowId, i) }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import useSquareObserver from "../composables/useSquareObserver.ts";
import { getRandomNumber, iterateArray } from "../utils";
import { store } from "../store";

const props = defineProps<{
  rowId: number,
  cols: number
}>()

const squareRefs = ref<null | HTMLElement[]>(null)
const numberRefs = ref<null | HTMLElement[]>(null)
const { addObserver, removeObserver } = useSquareObserver()
const numberForSquare = computed(
    () => (row: number, col: number) => store.squareNumbers[`${row}_${col}`]
)
onMounted(() => {
  if (numberRefs.value) {
    const generator = iterateArray(numberRefs.value)
    for (let [_, entry] of generator) {
      entry.innerText = getRandomNumber(1, 1000).toString()
    }
    numberRefs.value = null
  }
  if (squareRefs.value) {
    const generator = iterateArray(squareRefs.value)
    for (let [_, entry] of generator) {
      addObserver(entry)
    }
  }
})
onUnmounted(() => {
  if (squareRefs.value) {
    squareRefs.value.forEach(ref => removeObserver(ref))
  }
})
</script>

<style></style>