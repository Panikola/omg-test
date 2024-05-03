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

const randomRowsCount = getRandomNumber(500, 500)
const randomColsCount = getRandomNumber(100, 100)
</script>

<style></style>