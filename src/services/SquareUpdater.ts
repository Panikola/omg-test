export class SquareUpdater {
    private animationFrameId = 0
    private lastUpdateTime = 0
    private updateSquares = (timestamp: number) => {
        if (timestamp - this.lastUpdateTime > 1000) { // Check if a second has passed
            this.lastUpdateTime = timestamp
            this.squareUpdaterCallback()
        }

        this.animationFrameId = requestAnimationFrame(this.updateSquares)
    }
    constructor(private squareUpdaterCallback: () => void) {}

    initAnimation() {
        this.animationFrameId = requestAnimationFrame(this.updateSquares)
    }

    cancelAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
        }
    }
}