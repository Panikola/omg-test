import useSquareUpdater from "./useSquareUpdater.ts";
import { getRandomNumber, getRowId } from "../utils";
import { store } from "../store";
import useSquareObserver from "./useSquareObserver.ts";

export default function useStore() {
    const updateVisibleSquaresList = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            const squareId = entry.target.id;
            if (entry.isIntersecting) {
                store.visibleSquares.push(squareId || '');
            } else {
                store.visibleSquares = store.visibleSquares.filter((id: string) => id !== squareId);
            }
        });
    }

    const updateRandomSquareInRows = () => {
        const groupedSquares = groupVisibleSquaresByRow();
        updateRandomVisibleSquareInEachRow(groupedSquares);
    }

    const squareObserver = useSquareObserver(updateVisibleSquaresList)
    const squareUpdater = useSquareUpdater(updateRandomSquareInRows);

    const initAnimation = () => {
        squareUpdater.initAnimation();
    }

    const cancelAnimation = () => {
        squareUpdater.cancelAnimation();
    }

    const addObserver = (squareEl: Element) => {
        squareObserver.addObserver(squareEl);
    }

    const removeObserver = (squareEl: Element) => {
        squareObserver.removeObserver(squareEl);
    }

    const squareNumber = (squareId: string): number => {
        return store.randomNumberForSquare[squareId] || 0;
    }


    const groupVisibleSquaresByRow = () => {
        const groupedSquares = {} as Record<string, string[]>;
        store.visibleSquares.forEach((squareId: string) => {
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
            const randomIndex = getRandomNumber(0, visibleSquaresInRow.length - 1);
            const randomSquareId = visibleSquaresInRow[randomIndex];
            store.randomVisibleSquareInEachRow[rowId] = visibleSquaresInRow[randomIndex];
            store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000);
        });
    }

    return {
        initAnimation,
        cancelAnimation,
        addObserver,
        removeObserver,
        squareNumber
    }
}