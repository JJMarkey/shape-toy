import { PropTypes } from 'prop-types'
import { CanvasDimensions, ElementIds } from '@constants'
import { Button } from '@mui/material'

export default function BaseSidebar({
    color,
    setColor,
    xCoord,
    setXCoord,
    yCoord,
    setYCoord,
    draw,
}) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.XCoordinateInput}>
                    X Coordinate
                </label>
                <input
                    type="number"
                    onChange={(event) => setXCoord(event.target.value)}
                    value={xCoord}
                    id={ElementIds.XCoordinateInput}
                    min={0}
                    max={CanvasDimensions.Width}
                />
            </div>
            <div>
                <label htmlFor={ElementIds.YCoordinateInput}>
                    Y Coordinate
                </label>
                <input
                    type="number"
                    onChange={(event) => setYCoord(event.target.value)}
                    value={yCoord}
                    id={ElementIds.YCoordinateInput}
                    min={0}
                    max={CanvasDimensions.Height}
                />
            </div>
            <div>
                <label htmlFor={ElementIds.ColorInput}>Color Picker</label>
                <input
                    type="color"
                    onChange={(event) => setColor(event.target.value)}
                    value={color}
                    id={ElementIds.ColorInput}
                />
            </div>
            <div>
                <Button onClick={draw}>Draw Image</Button>
            </div>
        </>
    )
}

BaseSidebar.propTypes = {
    color: PropTypes.string,
    setColor: PropTypes.func,
    xCoord: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setXCoord: PropTypes.func,
    yCoord: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setYCoord: PropTypes.func,
    draw: PropTypes.func,
}
