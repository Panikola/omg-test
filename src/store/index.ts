import { reactive } from 'vue'
import {SquareObserver} from "../services/SquareObserver.ts";
import {SquareUpdater} from "../services/SquareUpdater.ts";
import {getRandomNumber, getRowId} from "../utils";

export const store = reactive({
    visibleSquares: <string[]>[],
    randomVisibleSquareInEachRow: <Record<string, string>>{},
    randomNumberForSquare: <Record<string, number>>{},
})

const squareObserver = new SquareObserver(updateVisibleSquaresList)
const squareUpdater = new SquareUpdater(updateRandomSquareInRows)

function updateVisibleSquaresList (entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
        const squareId = entry.target.id
        if (entry.isIntersecting) {
            store.visibleSquares.push(squareId || '')
        } else {
            store.visibleSquares = store.visibleSquares.filter((id: string) => id !== squareId)
        }
    })
}
function updateRandomSquareInRows () {
    const groupedSquares = groupVisibleSquaresByRow()
    updateRandomVisibleSquareInEachRow(groupedSquares)
}
function groupVisibleSquaresByRow() {
    const groupedSquares = {} as Record<string, string[]>
    store.visibleSquares.forEach((squareId: string) => {
        const rowId = getRowId(squareId)
        if (!groupedSquares[rowId]) {
            groupedSquares[rowId] = []
        }
        groupedSquares[rowId].push(squareId)
    })
    return groupedSquares
}
function updateRandomVisibleSquareInEachRow(groupedSquares: Record<string, string[]>) {
    Object.keys(groupedSquares).forEach(rowId => {
        const visibleSquaresInRow = groupedSquares[rowId]
        const randomIndex = getRandomNumber(0, visibleSquaresInRow.length - 1)
        const randomSquareId = visibleSquaresInRow[randomIndex]
        store.randomVisibleSquareInEachRow[rowId] = visibleSquaresInRow[randomIndex]
        store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000)
    })
}

export function initAnimation() {
    squareUpdater.initAnimation()
}
export function cancelAnimation() {
    squareUpdater.cancelAnimation()
}

export function addObserver(squareEl: Element) {
    squareObserver.addObserver(squareEl)
}
export function removeObserver(squareEl: Element) {
    squareObserver.removeObserver(squareEl)
}