export function getRowId(squareId: string): string {
    return squareId.split('_')[0];
}

export function createVisibilityObserver(callback: (isVisible: boolean) => void) {
    const observer = new IntersectionObserver((entries) => {
        callback(entries[0].isIntersecting);
    });

    return {
        observe: (element: Element) => observer.observe(element),
        unobserve: (element: Element) => observer.unobserve(element),
    };
}

export function getRandomNumber(min: number = 10, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}