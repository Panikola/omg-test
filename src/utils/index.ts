export function getRowId(squareId: string): string {
    return squareId.split('_')[0];
}

export function getRandomNumber(min: number = 10, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}