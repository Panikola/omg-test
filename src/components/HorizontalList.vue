<template>
  <ul class="horizontal-list">
    <li
        v-for="i in props.cols"
        :id="`${props.rowId}_${i}`"
        :key="i"
        ref="squareRefs"
        class="horizontal-list-item"
    >
      <div
          v-show="store.visibleSquares[`${props.rowId}_${i}`]"
          class="square"
      >
        {{ store.squareNumbers[`${props.rowId}_${i}`] }}
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getRandomNumber, iterateArray } from "../utils";
import { store } from "../store";
import useObserver from "../composables/useObserver.ts";

const props = defineProps<{
  rowId: number,
  cols: number
}>()
const squareRefs = ref<null | HTMLElement[]>(null)
const { addObserver } = useObserver(store.visibleSquares)

onMounted(() => {
  if (squareRefs.value) {
    const generator = iterateArray(squareRefs.value)
    for (let [_, entry] of generator) {
      setTimeout(() => {
        (entry.firstChild as HTMLElement).innerText = getRandomNumber(1, 1000).toString()
      })
      addObserver(entry)
    }
  }
})
</script>

<style></style>