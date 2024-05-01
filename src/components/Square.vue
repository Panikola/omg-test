<template>
  <div
      class="square"
      :class="{ flash: flash }"
      ref="squareRef"
  >
    {{ number }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { store } from '../store'
import { createVisibilityObserver, getRandomNumber } from '../utils'

const props = defineProps<{
  rowId: number,
  squareId: number
}>()

const id = `${props.rowId}_${props.squareId}`
const number = ref(getRandomNumber(1, 1000))
const flash = ref(false)
const squareRef = ref<null | HTMLElement>(null)

watch(() => store.randomNumberForSquare[id], (newNumber) => {
  number.value = newNumber
  flash.value = true
  setTimeout(() => flash.value = false, 300)
})

const { observe, unobserve } = createVisibilityObserver(isVisible => {
  if (isVisible) {
    store.visibleSquares.push(id)
  } else {
    store.visibleSquares = store.visibleSquares.filter(squareId => squareId !== id)
  }
})

onMounted(() => {
  if (squareRef.value) {
    observe(squareRef.value)
  }
})
onUnmounted(() => {
  if (squareRef.value) {
    unobserve(squareRef.value)
  }
})
</script>

<style scoped>
.square {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}
.square:hover {
  transform: scale(0.8);
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