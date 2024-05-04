<template>
  <div style="margin-top: 10px">
    Rows: <span>{{ rows }}</span>
    Columns: <span>{{ cols }}</span>
  </div>

  <ul class="vertical-list">
    <li
        v-for="i in rows"
        :id="`${i}`"
        :key="i"
        ref="rowsRefs"
        class="vertical-list-item"
    >
      <HorizontalList
          v-if="store.visibleRows[i]"
          :cols="cols"
          :row-id="i"
          class="horizontal-list"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import HorizontalList from './HorizontalList.vue'
import { getRandomNumber, iterateArray } from "../utils";
import { onMounted, ref } from "vue";
import useObserver from "../composables/useObserver.ts";
import { store } from "../store";

const rows = getRandomNumber(500, 2000)
const cols = getRandomNumber(30, 100)
const { addObserver } = useObserver(store.visibleRows)

const rowsRefs = ref<null | HTMLElement[]>(null)

onMounted(() => {
  if (rowsRefs.value) {
    const generator = iterateArray(rowsRefs.value)
    for (let [_, entry] of generator) {
      addObserver(entry)
    }
  }
})
</script>

<style></style>