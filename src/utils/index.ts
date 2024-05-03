export function getRowId(squareId: string): string {
    return squareId.split('_')[0];
}

export function getRandomNumber(min: number = 10, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function* iterateObject(obj: Record<string, any>) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            yield [key, obj[key]];
        }
    }
}

export function* iterateArray<T>(array: T[]): Generator<[number, T], void, unknown> {
    let index = 0;
    for (const item of array) {
        yield [index, item];
        index++;
    }
}