import { PropTypes } from 'prop-types'
import { ElementIds } from '@constants'
import BaseSidebar from './base-sidebar'

export default function CircularSidebar(props) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.RadiusInput}>Radius</label>
                <input
                    type="range"
                    value={props.radius}
                    id={ElementIds.RadiusInput}
                    onChange={(event) => props.setRadius(event.target.value)}
                    min={0}
                    max={300}
                />
            </div>

            <BaseSidebar {...props} />
        </>
    )
}

CircularSidebar.propTypes = {
    radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setRadius: PropTypes.func,
}
