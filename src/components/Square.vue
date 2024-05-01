<template>
  <div
      :id="props.squareId"
      ref="squareRef"
      :class="{ flash: flash }"
      class="square"
  >
    {{ number }}
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { getRandomNumber } from '../utils'
import useSquareObserver from "../composables/useSquareObserver.ts";
import useStore from "../composables/useStore.ts";

const props = defineProps<{
  squareId: string
}>()
const { addObserver, removeObserver } = useSquareObserver()
const { squareNumber } = useStore()
const number = ref(getRandomNumber(1, 1000))
const flash = ref(false)
const squareRef = ref<null | HTMLElement>(null)

watch(() => squareNumber(props.squareId), (newNumber) => {
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
  0% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(255, 255, 0, 0.5);
  }
  100% {
    background-color: transparent;
  }
}

.flash {
  animation: flash 0.3s ease-out;
}
</style>