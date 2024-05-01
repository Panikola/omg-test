export default function useSquareObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
    const observer = new IntersectionObserver(callback)


    const addObserver = (squareEl: Element) => {
        observer.observe(squareEl)
    }

    const removeObserver = (squareEl: Element) => {
        observer.unobserve(squareEl)
    }

    return {
        addObserver,
        removeObserver
    }
}