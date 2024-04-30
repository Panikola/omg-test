<template>
  <VerticalList />
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'
import VerticalList from './components/VerticalList.vue'
import { store } from './store'
import {getRandomNumber, getRowId} from './utils'

let animationFrameId: null | number = null
let lastUpdateTime = 0

const updateSquares = (timestamp: number) => {
  if (timestamp - lastUpdateTime > 1000) { // Check if a second has passed
    lastUpdateTime = timestamp

    const visibleSquaresInEachRow = {} as Record<string, string[]>
    store.visibleSquares.forEach(squareId => {
      const rowId = getRowId(squareId)
      if (!visibleSquaresInEachRow[rowId]) {
        visibleSquaresInEachRow[rowId] = []
      }
      visibleSquaresInEachRow[rowId].push(squareId)
    })

    Object.keys(visibleSquaresInEachRow).forEach(rowId => {
      const visibleSquaresInRow = visibleSquaresInEachRow[rowId]
      const randomIndex = getRandomNumber(0, visibleSquaresInRow.length - 1)
      const randomSquareId = visibleSquaresInRow[randomIndex]
      store.randomVisibleSquareInEachRow[rowId] = visibleSquaresInRow[randomIndex]
      store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000)
    })
  }


  animationFrameId = requestAnimationFrame(updateSquares)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(updateSquares)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped></style>