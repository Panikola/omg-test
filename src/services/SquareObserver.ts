export class SquareObserver {
    private observer: IntersectionObserver;

    constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        this.observer = new IntersectionObserver(callback)
    }

    addObserver(squareEl: Element) {
        this.observer.observe(squareEl)
    }

    removeObserver(squareEl: Element) {
        this.observer.unobserve(squareEl)
    }
}