<template>
  <div
      class="square"
      :class="{ flash: flash }"
      ref="squareRef"
      :id="props.squareId"
  >
    {{ number }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {addObserver, removeObserver, store} from '../store'
import { getRandomNumber } from '../utils'

const props = defineProps<{
  squareId: string
}>()

const number = ref(getRandomNumber(1, 1000))
const flash = ref(false)
const squareRef = ref<null | HTMLElement>(null)

watch(() => store.randomNumberForSquare[props.squareId], (newNumber) => {
  number.value = newNumber
  flash.value = true
  setTimeout(() => flash.value = false, 300)
})

onMounted(() => {
  if (squareRef.value) {
    addObserver(squareRef.value)
  }
})
onUnmounted(() => {
  if (squareRef.value) {
    removeObserver(squareRef.value)
  }
})
</script>

<style scoped>
.square {
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}
.square:hover {
  transform: scale(0.8);
}
@media (prefers-color-scheme: light) {
  .square {
    border-color: var(--color-dark);
  }
}
@keyframes flash {
  0% { background-color: transparent; }
  50% { background-color: rgba(255, 255, 0, 0.5); }
  100% { background-color: transparent; }
}

.flash {
  animation: flash 0.3s ease-out;
}
</style>