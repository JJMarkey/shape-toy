import { useReducer, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import { FlexGrid, Footer, Sidebar } from '@components'
import {
    CanvasDimensions,
    DrawableTypes,
    ElementIds,
    ShapeReducerActions,
} from '@constants'
import { useComponentFirstMount } from '@hooks'
import {
    checkShiftClick,
    restoreFromStorage,
    shouldHighlight,
    shouldSelect,
} from '@utils'

function reducer(state, { action, payload }) {
    switch (action) {
        case ShapeReducerActions.Color:
        case ShapeReducerActions.Height:
        case ShapeReducerActions.Radius:
        case ShapeReducerActions.Width:
        case ShapeReducerActions.XCoord:
        case ShapeReducerActions.YCoord: {
            return { ...state, [action]: payload }
        }
        default:
            return state
    }
}

function App() {
    const canvasContext = useRef()
    const canvas = useRef()
    const [selectedDrawType, setSelectedDrawType] = useState()

    const [shapeValues, dispatch] = useReducer(reducer, {
        [ShapeReducerActions.Color]: '#000000',
        [ShapeReducerActions.Height]: 0,
        [ShapeReducerActions.Width]: 0,
        [ShapeReducerActions.Radius]: 0,
        [ShapeReducerActions.XCoord]: 0,
        [ShapeReducerActions.YCoord]: 0,
    })

    useComponentFirstMount(() => {
        canvas.current = document.getElementById(ElementIds.ShapeToyCanvas)
        canvasContext.current = canvas.current.getContext('2d')

        restoreFromStorage(canvasContext.current)

        return () => {
            canvasContext.current = undefined
        }
    })

    useComponentFirstMount(() => {
        function handleMouseMove(event) {
            event.preventDefault()
            event.stopPropagation()

            const bounding = canvas.current.getBoundingClientRect()

            let xCoord = parseInt(event.clientX - bounding.left)
            let yCoord = parseInt(event.clientY - bounding.top)

            shouldHighlight(canvasContext.current, {
                xCoord,
                yCoord,
            })
        }
        canvas.current.addEventListener('mousemove', handleMouseMove)

        return () =>
            canvas.current.removeEventListener('mouseover', handleMouseMove)
    })

    useComponentFirstMount(() => {
        function handleClick(event) {
            checkShiftClick(event, (allowMultiSelect) =>
                shouldSelect(canvasContext.current, allowMultiSelect)
            )
        }
        canvas.current.addEventListener('click', handleClick)

        return () => canvas.current.removeEventListener('click', handleClick)
    })

    return (
        <FlexGrid spacing={2} columns={3}>
            <FlexGrid.Item columnWidth={2}>
                <canvas
                    id={ElementIds.ShapeToyCanvas}
                    height={CanvasDimensions.Height}
                    width={CanvasDimensions.Width}
                />
            </FlexGrid.Item>
            <FlexGrid.Item columnWidth={1}>
                <Sidebar
                    canvasContext={canvasContext.current}
                    dispatch={dispatch}
                    selectedDrawType={selectedDrawType}
                    shapeValues={shapeValues}
                />
            </FlexGrid.Item>
            <FlexGrid.Item columnWidth={2}>
                <Footer>
                    <IconButton
                        color="primary"
                        aria-label="Add Circle"
                        onClick={() =>
                            setSelectedDrawType(DrawableTypes.Circle)
                        }
                    >
                        <CircleRoundedIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="Add Rectangle"
                        onClick={() =>
                            setSelectedDrawType(DrawableTypes.Rectangle)
                        }
                    >
                        <SquareRoundedIcon />
                    </IconButton>
                </Footer>
            </FlexGrid.Item>
        </FlexGrid>
    )
}

export default App
