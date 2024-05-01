<template>
  <a class="repo-link" href="https://github.com/Panikola/omg-test">Github Repo: https://github.com/Panikola/omg-test</a>
  <VerticalList/>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import VerticalList from './components/VerticalList.vue'
import useStore from "./composables/useStore";

const { initAnimation, cancelAnimation } = useStore()
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