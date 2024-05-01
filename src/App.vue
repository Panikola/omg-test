<template>
  <VerticalList />
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'
import VerticalList from './components/VerticalList.vue'
import { initAnimation, cancelAnimation } from './store'


onMounted(() => {
  initAnimation()
})

onUnmounted(() => {
  cancelAnimation()
})
</script>

<style scoped></style>