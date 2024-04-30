import { reactive } from 'vue'

export const store = reactive({
    visibleSquares: [] as string[],
    randomVisibleSquareInEachRow: {} as Record<string, string>,
    randomNumberForSquare: {} as Record<string, number>,
    hoveredSquare: null as null | string,
})