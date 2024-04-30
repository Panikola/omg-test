<template>
  <ol class="vertical-list">
    <li v-for="i in randomRowsCount" :key="i">
      <HorizontalList class="horizontal-list" :row-id="i" :cols="randomColsCount"/>
    </li>
  </ol>
</template>

<script setup lang="ts">
import HorizontalList from './HorizontalList.vue'
import {getRandomNumber} from "../utils";
const randomRowsCount = getRandomNumber(100, 200)
const randomColsCount = getRandomNumber(10, 30)
</script>

<style scoped></style>