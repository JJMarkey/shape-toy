import { PropTypes } from 'prop-types'
import { ElementIds } from '@enums'
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
                />
            </div>

            <div>
                <label htmlFor={ElementIds.HeightInput}>Height</label>
                <input
                    type="number"
                    id={ElementIds.WidthInput}
                    value={props.height}
                    onChange={(event) => props.setHeight(event.target.value)}
                />
            </div>

            <BaseSidebar {...props} />
        </>
    )
}

RectangularSidebar.propTypes = {
    width: PropTypes.number,
    setWidth: PropTypes.func,
    height: PropTypes.number,
    setHeight: PropTypes.func,
}
