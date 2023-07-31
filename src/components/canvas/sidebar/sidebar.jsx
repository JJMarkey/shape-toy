import { PropTypes } from 'prop-types'
import { DrawableTypes, ShapeReducerActions } from '@enums'
import { draw } from '@utils'
import RectangularSidebar from './sidebar-variants/rectangular-sidebar'
import CircularSidebar from './sidebar-variants/circular-sidebar'

export default function Sidebar({
    canvasContext,
    dispatch,
    selectedDrawType,
    shapeValues,
}) {
    function drawOnCanvas() {
        draw(canvasContext, selectedDrawType, shapeValues)
    }

    switch (selectedDrawType) {
        case DrawableTypes.Circle:
            return (
                <CircularSidebar
                    {...shapeValues}
                    setRadius={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.Radius,
                            payload,
                        })
                    }
                    setColor={(payload) =>
                        dispatch({ action: ShapeReducerActions.Color, payload })
                    }
                    setXCoord={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.XCoord,
                            payload,
                        })
                    }
                    setYCoord={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.YCoord,
                            payload,
                        })
                    }
                    draw={drawOnCanvas}
                />
            )
        case DrawableTypes.Rectangle:
            return (
                <RectangularSidebar
                    {...shapeValues}
                    setWidth={(payload) =>
                        dispatch({ action: ShapeReducerActions.Width, payload })
                    }
                    setHeight={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.Height,
                            payload,
                        })
                    }
                    setColor={(payload) =>
                        dispatch({ action: ShapeReducerActions.Color, payload })
                    }
                    setXCoord={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.XCoord,
                            payload,
                        })
                    }
                    setYCoord={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.YCoord,
                            payload,
                        })
                    }
                    draw={drawOnCanvas}
                />
            )
        default:
            return <p>Select a drawtype!</p>
    }
}

Sidebar.propTypes = {
    canvasContext: PropTypes.any,
    dispatch: PropTypes.func,
    selectedDrawType: PropTypes.oneOf([
        DrawableTypes.Circle,
        DrawableTypes.Rectangle,
    ]),
    shapeValues: PropTypes.shape({
        [ShapeReducerActions.Color]: PropTypes.string,
        [ShapeReducerActions.Height]: PropTypes.number,
        [ShapeReducerActions.Width]: PropTypes.number,
        [ShapeReducerActions.Radius]: PropTypes.number,
        [ShapeReducerActions.XCoord]: PropTypes.number,
        [ShapeReducerActions.YCoord]: PropTypes.number,
    }),
}
