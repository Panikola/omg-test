<template>
  <ul class="horizontal-list">
    <li v-for="i in props.cols" :key="i">
      <Square :row-id="props.rowId" :square-id="`${props.rowId}_${i}`"/>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import Square from './Square.vue'

const props = defineProps<{
  rowId: number,
  cols: number
}>()

</script>

<style scoped>
.horizontal-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>