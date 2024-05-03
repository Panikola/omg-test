<template>
  <div
      v-if="visible"
      class="square"
  >
    {{ number }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { getRandomNumber } from '../utils'
import useSquare from "../composables/useSquare.ts";
import { store } from "../store";

const props = defineProps<{
  squareId: string
}>()
const { squareNumber } = useSquare()
const number = ref(getRandomNumber(1, 1000))
// const flash = ref(false)
const visible = computed(() => {
  return store.visibleSquares[props.squareId]
})
watch(() => squareNumber(props.squareId), (newNumber) => {
  number.value = newNumber
  // flash.value = true
  // setTimeout(() => flash.value = false, 300)
})
</script>

<style></style>