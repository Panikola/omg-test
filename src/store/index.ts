import { reactive } from 'vue'

export const store = reactive({
    visibleSquares: <Record<string, boolean>>{},
    randomNumberForSquare: <Record<string, number>>{},
})