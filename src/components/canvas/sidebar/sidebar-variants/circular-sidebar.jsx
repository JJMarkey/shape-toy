import { PropTypes } from 'prop-types'
import { ElementIds } from '@enums'
import BaseSidebar from './base-sidebar'

export default function CircularSidebar(props) {
    return (
        <>
            <div>
                <label htmlFor={ElementIds.RadiusInput}>Radius</label>
                <input
                    type="number"
                    value={props.radius}
                    id={ElementIds.RadiusInput}
                    onChange={(event) => props.setRadius(event.target.value)}
                />
            </div>

            <BaseSidebar {...props} />
        </>
    )
}

CircularSidebar.propTypes = {
    radius: PropTypes.number,
    setRadius: PropTypes.func,
}
