import { CanvasDimensions, ElementIds } from '@constants'

export default function Canvas() {
    return (
        <canvas
            id={ElementIds.ShapeToyCanvas}
            height={CanvasDimensions.Height}
            width={CanvasDimensions.Width}
        />
    )
}
