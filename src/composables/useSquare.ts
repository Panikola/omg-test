import { store } from "../store";

export default function useSquare() {
    const squareNumber = (squareId: string): number => {
        return store.randomNumberForSquare[squareId] || 0;
    }

    return {
        squareNumber
    }
}