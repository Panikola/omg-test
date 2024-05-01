import { reactive } from 'vue'

export const store = reactive({
    visibleSquares: <string[]>[],
    randomVisibleSquareInEachRow: <Record<string, string>>{},
    randomNumberForSquare: <Record<string, number>>{},
})