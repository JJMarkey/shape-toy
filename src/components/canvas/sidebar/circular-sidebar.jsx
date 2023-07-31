import { ElementIds } from '@enums'
import BaseSidebar from './base-sidebar'

export default function CircularSidebar({
    color,
    setColor,
    radius,
    setRadius,
}) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.RadiusInput}>Radius</label>
                <input
                    type="number"
                    value={radius}
                    id={ElementIds.RadiusInput}
                    onChange={(event) => setRadius(event.target.value)}
                />
            </div>

            <BaseSidebar color={color} setColor={setColor} />
        </>
    )
}
