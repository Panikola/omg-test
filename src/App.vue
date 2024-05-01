<template>
  <a class="repo-link" href="https://github.com/Panikola/omg-test">Github Repo: https://github.com/Panikola/omg-test</a>
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

<style scoped>
.repo-link {
  color: var(--color-light);
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
}

@media (prefers-color-scheme: light) {
  .repo-link {
    color: var(--color-dark);
  }
}
</style>