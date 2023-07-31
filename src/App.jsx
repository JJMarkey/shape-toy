import { useReducer, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import { Canvas, FlexGrid, Footer, Sidebar } from '@components'
import { ElementIds, DrawableTypes } from '@enums'
import { useComponentFirstMount } from '@hooks'
import { restoreFromStorage } from '@utils'
import { ShapeReducerActions } from './enums'

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

    return (
        <FlexGrid spacing={2} columns={3}>
            <FlexGrid.Item columnWidth={2}>
                <Canvas />
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
