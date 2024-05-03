import { store } from "../store";
import { getRandomNumber, getRowId } from "../utils";
import { onMounted, onUnmounted } from "vue";

export default function SquareUpdater() {
    let animationFrameId = 0
    let lastUpdateTime = 0

    const groupVisibleSquaresByRow = () => {
        const groupedSquares = {} as Record<string, string[]>;
        Object.keys(store.visibleSquares).forEach((squareId: string) => {
            const rowId = getRowId(squareId);
            if (!groupedSquares[rowId]) {
                groupedSquares[rowId] = [];
            }
            groupedSquares[rowId].push(squareId);
        });
        return groupedSquares;
    }

    const updateRandomVisibleSquareInEachRow = (groupedSquares: Record<string, string[]>) => {
        Object.keys(groupedSquares).forEach(rowId => {
            const visibleSquaresInRow = groupedSquares[rowId];
            const randomIndex = getRandomNumber(1, visibleSquaresInRow.length);
            const randomSquareId = visibleSquaresInRow[randomIndex];
            store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000);
        });
    }

    const updateRandomSquareInRows = () => {
        const groupedSquares = groupVisibleSquaresByRow();
        updateRandomVisibleSquareInEachRow(groupedSquares);
    }

    const updateSquares = (timestamp: number) => {
        if (timestamp - lastUpdateTime > 1000) { // Check if a second has passed
            lastUpdateTime = timestamp
            updateRandomSquareInRows()
        }

        animationFrameId = requestAnimationFrame(updateSquares)
    }

    const initAnimation = () => {
        animationFrameId = requestAnimationFrame(updateSquares)
    }

    const cancelAnimation = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
        }
    }

    onMounted(() => {
        initAnimation()
    })

    onUnmounted(() => {
        cancelAnimation()
    })
}