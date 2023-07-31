import { useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'
import {
    Canvas,
    CircularSidebar,
    FlexGrid,
    Footer,
    RectangularSidebar,
} from '@components'
import { ElementIds, DrawableTypes } from '@enums'
import { useComponentFirstMount } from '@hooks'

function App() {
    const canvasContext = useRef()
    const [selectedDrawType, setSelectedDrawType] = useState()

    useComponentFirstMount(() => {
        const canvas = document.getElementById(ElementIds.ShapeToyCanvas)
        canvasContext.current = canvas.getContext('2d')

        return () => {
            canvasContext.current = undefined
        }
    })

    function renderSidebar() {
        switch (selectedDrawType) {
            case DrawableTypes.Circle:
                return <CircularSidebar />
            case DrawableTypes.Rectangle:
                return <RectangularSidebar />
            default:
                return <p>Select a drawtype!</p>
        }
    }

    return (
        <FlexGrid spacing={2} columns={3}>
            <FlexGrid.Item columnWidth={2}>
                <Canvas />
            </FlexGrid.Item>
            <FlexGrid.Item columnWidth={1}>{renderSidebar()}</FlexGrid.Item>
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
