import { PropTypes } from 'prop-types'
import { CanvasDimensions, ElementIds } from '@constants'
import BaseSidebar from './base-sidebar'

export default function RectangularSidebar(props) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.WidthInput}>Width</label>
                <input
                    type="number"
                    id={ElementIds.WidthInput}
                    value={props.width}
                    onChange={(event) => props.setWidth(event.target.value)}
                    max={CanvasDimensions.Width}
                    min={0}
                />
            </div>

            <div>
                <label htmlFor={ElementIds.HeightInput}>Height</label>
                <input
                    type="number"
                    id={ElementIds.WidthInput}
                    value={props.height}
                    onChange={(event) => props.setHeight(event.target.value)}
                    max={CanvasDimensions.Height}
                    min={0}
                />
            </div>

            <BaseSidebar {...props} />
        </>
    )
}

RectangularSidebar.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setWidth: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setHeight: PropTypes.func,
}
