import { ElementIds } from '@enums'

export default function BaseSidebar({ color, setColor }) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.ColorInput}>Color Picker</label>
                <input
                    type="color"
                    onChange={(event) => setColor(event.target.value)}
                    value={color}
                    id={ElementIds.ColorInput}
                />
            </div>
        </>
    )
}
