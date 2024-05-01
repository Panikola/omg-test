import { SquareObserver } from "./SquareObserver.ts";
import { SquareUpdater } from "./SquareUpdater.ts";
import { getRandomNumber, getRowId } from "../utils";

export class StoreService {
    private squareObserver: SquareObserver;
    private squareUpdater: SquareUpdater;


    constructor(private store: any) {
        this.squareObserver = new SquareObserver(this.updateVisibleSquaresList.bind(this));
        this.squareUpdater = new SquareUpdater(this.updateRandomSquareInRows.bind(this));
    }

    public initAnimation() {
        this.squareUpdater.initAnimation();
    }

    public cancelAnimation() {
        this.squareUpdater.cancelAnimation();
    }

    public addObserver(squareEl: Element) {
        this.squareObserver.addObserver(squareEl);
    }

    public removeObserver(squareEl: Element) {
        this.squareObserver.removeObserver(squareEl);
    }

    public squareNumber(squareId: string): number {
        return this.store.randomNumberForSquare[squareId] || 0;
    }

    private updateVisibleSquaresList(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
            const squareId = entry.target.id;
            if (entry.isIntersecting) {
                this.store.visibleSquares.push(squareId || '');
            } else {
                this.store.visibleSquares = this.store.visibleSquares.filter((id: string) => id !== squareId);
            }
        });
    }

    private updateRandomSquareInRows() {
        const groupedSquares = this.groupVisibleSquaresByRow();
        this.updateRandomVisibleSquareInEachRow(groupedSquares);
    }

    private groupVisibleSquaresByRow() {
        const groupedSquares = {} as Record<string, string[]>;
        this.store.visibleSquares.forEach((squareId: string) => {
            const rowId = getRowId(squareId);
            if (!groupedSquares[rowId]) {
                groupedSquares[rowId] = [];
            }
            groupedSquares[rowId].push(squareId);
        });
        return groupedSquares;
    }

    private updateRandomVisibleSquareInEachRow(groupedSquares: Record<string, string[]>) {
        Object.keys(groupedSquares).forEach(rowId => {
            const visibleSquaresInRow = groupedSquares[rowId];
            const randomIndex = getRandomNumber(0, visibleSquaresInRow.length - 1);
            const randomSquareId = visibleSquaresInRow[randomIndex];
            this.store.randomVisibleSquareInEachRow[rowId] = visibleSquaresInRow[randomIndex];
            this.store.randomNumberForSquare[randomSquareId] = getRandomNumber(1, 1000);
        });
    }
}