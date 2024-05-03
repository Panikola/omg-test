import { store } from "../store";

export default function useSquare() {
    const squareNumber = (squareId: string): number => {
        return store.randomNumberForSquare[squareId] || 0;
    }
    const squareVisibility = (squareId: string): boolean => {
        return store.visibleSquares[squareId];
    }

    return {
        squareNumber,
        squareVisibility
    }
}