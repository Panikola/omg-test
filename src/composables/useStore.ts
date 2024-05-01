import { store } from "../store";

export default function useStore() {
    const squareNumber = (squareId: string): number => {
        return store.randomNumberForSquare[squareId] || 0;
    }

    return {
        squareNumber
    }
}