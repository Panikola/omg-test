import { store } from "../store";

export default function useSquareObserver() {
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

    const squareNumber = (squareId: string): number => {
        return store.randomNumberForSquare[squareId] || 0;
    }

    const observer = new IntersectionObserver(updateVisibleSquaresList)

    const addObserver = (squareEl: Element) => {
        observer.observe(squareEl)
    }

    const removeObserver = (squareEl: Element) => {
        observer.unobserve(squareEl)
    }

    return {
        addObserver,
        removeObserver,
        squareNumber
    }
}