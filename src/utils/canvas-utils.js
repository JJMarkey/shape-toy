import {
    DrawableTypes
} from '@constants'

export function draw(canvasContext, type, payload) {
    if (!detectIfCoordsAreFilled(canvasContext, payload)) {
        switch (type) {
            case DrawableTypes.Circle: {
                createCircle(canvasContext, payload)
                break
            }
            case DrawableTypes.Rectangle: {
                createRectangle(canvasContext, payload)
                break
            }
        }
    }
}

export function restoreFromStorage(canvasContext) {
    const elems = JSON.parse(window.localStorage.getItem('elementCoords')) ?? []

    elems.forEach((elem) => {
        const parsed = JSON.parse(elem)
        draw(canvasContext, parsed.type, parsed)
    })
}

function createRectangle(
    canvasContext, {
        xCoord,
        yCoord,
        width,
        height,
        color
    }
) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(xCoord, yCoord, width, height)

    storeCanvasElement(DrawableTypes.Rectangle, {
        xCoord,
        yCoord,
        width,
        height,
        color,
    })
}

function createCircle(canvasContext, {
    xCoord,
    yCoord,
    radius,
    color
}) {
    canvasContext.fillStyle = color
    canvasContext.arc(xCoord, yCoord, radius, 0, 2 * Math.PI)
    canvasContext.fill()
    canvasContext.closePath()

    storeCanvasElement(DrawableTypes.Circle, {
        xCoord,
        yCoord,
        radius,
        color,
    })
}

function storeCanvasElement(type, payload) {
    const storedCoords =
        JSON.parse(window.localStorage.getItem('elementCoords')) ?? []

    const stringifiedPayload = JSON.stringify({
        ...payload,
        type,
    })

    if (!storedCoords.some((elem) => elem === stringifiedPayload))
        storedCoords.push(stringifiedPayload)
    window.localStorage.setItem('elementCoords', JSON.stringify(storedCoords))
}

function detectIfCoordsAreFilled(canvasContext, {
    xCoord,
    yCoord
}) {
    return canvasContext.isPointInPath(xCoord, yCoord)
}