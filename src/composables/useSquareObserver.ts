import { store } from "../store";

export default function useSquareObserver() {
    const updateVisibleSquaresList = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            const squareId = entry.target.id;
            if (entry.isIntersecting) {
                store.visibleSquares[squareId] = true;
            } else {
                delete store.visibleSquares[squareId];
            }
        });
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
    }
}