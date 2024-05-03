<template>
  <ol class="vertical-list">
    <li v-for="i in rows" :key="i">
      <HorizontalList :cols="cols" :row-id="i" class="horizontal-list"/>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import HorizontalList from './HorizontalList.vue'
import { getRandomNumber } from "../utils";

const rows = getRandomNumber(500, 500)
const cols = getRandomNumber(100, 100)
</script>

<style></style>