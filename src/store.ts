import { reactive } from 'vue'
import {getRandomNumber, getRowId} from "./utils";

export const store = reactive({
    visibleSquares: <string[]>[],
    randomVisibleSquareInEachRow: <Record<string, string>>{},
    randomNumberForSquare: <Record<string, number>>{},
    hoveredSquare: <null | string>null,
    lastUpdateTime: 0,
    animationFrameId: <null | number>null,
})

const updateSquares = (timestamp: number) => {
    if (timestamp - store.lastUpdateTime > 1000) { // Check if a second has passed
        store.lastUpdateTime = timestamp
        const groupedSquares = groupVisibleSquaresByRow()
        updateRandomVisibleSquareInEachRow(groupedSquares)
    }

    store.animationFrameId = requestAnimationFrame(updateSquares)
}
const groupVisibleSquaresByRow = () => {
    const groupedSquares = {} as Record<string, string[]>
    store.visibleSquares.forEach(squareId => {
        const rowId = getRowId(squareId)
        if (!groupedSquares[rowId]) {
            groupedSquares[rowId] = []
        }
        groupedSquares[rowId].push(squareId)
    })
    return groupedSquares
}
const updateRandomVisibleSquareInEachRow = (groupedSquares: Record<string, string[]>) => {
    Object.keys(groupedSquares).forEach(rowId => {
        const visibleSquaresInRow = groupedSquares[rowId]
        const randomIndex = getRandomNumber(0, visibleSquaresInRow.length - 1)
        const randomSquareId = visibleSquaresInRow[randomIndex]
        store.randomVisibleSquareInEachRow[rowId] = visibleSquaresInRow[randomIndex]
        store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000)
    })
}

export function initAnimation() {
    store.animationFrameId = requestAnimationFrame(updateSquares)
}
export function cancelAnimation() {
    if (store.animationFrameId) {
        cancelAnimationFrame(store.animationFrameId)
    }
}

export function addObserver(el: Element) {
    observer.observe(el)
}
export function removeObserver(el: Element) {
    observer.unobserve(el)
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const squareId = entry.target.id
        if (entry.isIntersecting) {
            store.visibleSquares.push(squareId || '')
        } else {
            store.visibleSquares = store.visibleSquares.filter(id => id !== squareId)
        }
    })
})