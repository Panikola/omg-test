export default function SquareUpdater(squareUpdaterCallback: () => void) {
    let animationFrameId = 0
    let lastUpdateTime = 0

    const initAnimation = () => {
        animationFrameId = requestAnimationFrame(updateSquares)
    }

    const cancelAnimation = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
        }
    }

    const updateSquares = (timestamp: number) => {
        if (timestamp - lastUpdateTime > 1000) { // Check if a second has passed
            lastUpdateTime = timestamp
            squareUpdaterCallback()
        }

        animationFrameId = requestAnimationFrame(updateSquares)
    }

    return {
        initAnimation,
        cancelAnimation
    }
}