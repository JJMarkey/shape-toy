import { PropTypes } from 'prop-types'
import { DrawableTypes, ShapeReducerActions } from '@constants'
import { useComponentFirstMount } from '@hooks'
import {
    draw,
    getElementStorage,
    restoreFromStorage,
    setElementStorage,
} from '@utils'
import RectangularSidebar from './sidebar-variants/rectangular-sidebar'
import CircularSidebar from './sidebar-variants/circular-sidebar'
import { useState } from 'react'

export default function Sidebar({
    canvasContext,
    dispatch,
    selectedDrawType,
    shapeValues,
}) {
    const [storage, setStorage] = useState(getElementStorage())

    useComponentFirstMount(() => {
        function handleStorageEvent() {
            setStorage(getElementStorage())
        }
        window.addEventListener('storage', handleStorageEvent)

        return () => window.removeEventListener('storage', handleStorageEvent)
    })

    function handleElementUpdate(value, type, guid) {
        for (let image of storage) {
            if (image.guid === guid) {
                image[type] = value
            }
        }
        setElementStorage(storage)
        canvasContext?.reset()
        restoreFromStorage(canvasContext)
    }

    return (
        <>
            <AddShape
                canvasContext={canvasContext}
                dispatch={dispatch}
                selectedDrawType={selectedDrawType}
                shapeValues={shapeValues}
            />
            {storage
                .filter(({ isSelected }) => isSelected)
                .map((image) => {
                    if (image.type === DrawableTypes.Circle)
                        return (
                            <div key={image.guid}>
                                <CircularSidebar
                                    {...image}
                                    setRadius={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.Radius,
                                            image.guid
                                        )
                                    }
                                    setColor={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.Color,
                                            image.guid
                                        )
                                    }
                                    setXCoord={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.XCoord,
                                            image.guid
                                        )
                                    }
                                    setYCoord={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.YCoord,
                                            image.guid
                                        )
                                    }
                                />
                            </div>
                        )
                    else
                        return (
                            <div key={image.guid}>
                                <RectangularSidebar
                                    {...image}
                                    setHeight={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.Height,
                                            image.guid
                                        )
                                    }
                                    setWidth={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.Width,
                                            image.guid
                                        )
                                    }
                                    setColor={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.Color,
                                            image.guid
                                        )
                                    }
                                    setXCoord={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.XCoord,
                                            image.guid
                                        )
                                    }
                                    setYCoord={(event) =>
                                        handleElementUpdate(
                                            event,
                                            ShapeReducerActions.YCoord,
                                            image.guid
                                        )
                                    }
                                />
                            </div>
                        )
                })}
        </>
    )
}

function AddShape({ canvasContext, selectedDrawType, shapeValues, dispatch }) {
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
                        dispatch({
                            action: ShapeReducerActions.Color,
                            payload,
                        })
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
                        dispatch({
                            action: ShapeReducerActions.Width,
                            payload,
                        })
                    }
                    setHeight={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.Height,
                            payload,
                        })
                    }
                    setColor={(payload) =>
                        dispatch({
                            action: ShapeReducerActions.Color,
                            payload,
                        })
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
        [ShapeReducerActions.Height]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.Width]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.Radius]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.XCoord]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.YCoord]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }),
}

AddShape.propTypes = {
    canvasContext: PropTypes.any,
    dispatch: PropTypes.func,
    selectedDrawType: PropTypes.oneOf([
        DrawableTypes.Circle,
        DrawableTypes.Rectangle,
    ]),
    shapeValues: PropTypes.shape({
        [ShapeReducerActions.Color]: PropTypes.string,
        [ShapeReducerActions.Height]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.Width]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.Radius]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.XCoord]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        [ShapeReducerActions.YCoord]: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }),
}
