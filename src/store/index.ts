import { reactive } from 'vue'

export const store = {
    visibleSquares: reactive<Record<string, boolean>>({}),
    visibleRows: reactive<Record<string, boolean>>({}),
    squareNumbers: reactive<Record<string, number>>({}),
}