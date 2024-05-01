<template>
  <ol class="vertical-list">
    <li v-for="i in randomRowsCount" :key="i">
      <HorizontalList :cols="randomColsCount" :row-id="i" class="horizontal-list"/>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import HorizontalList from './HorizontalList.vue'
import { getRandomNumber } from "../utils";

const randomRowsCount = getRandomNumber(100, 200)
const randomColsCount = getRandomNumber(10, 30)
</script>

<style scoped></style>