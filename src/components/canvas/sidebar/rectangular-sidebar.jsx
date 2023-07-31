import { ElementIds } from '@enums'
import BaseSidebar from './base-sidebar'

export default function RectangularSidebar({
    color,
    setColor,
    width,
    setWidth,
    height,
    setHeight,
}) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.WidthInput}>Width</label>
                <input
                    type="number"
                    id={ElementIds.WidthInput}
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor={ElementIds.HeightInput}>Height</label>
                <input
                    type="number"
                    id={ElementIds.WidthInput}
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                />
            </div>

            <BaseSidebar color={color} setColor={setColor} />
        </>
    )
}
