import * as crypto from 'crypto'
import { DrawableTypes, DrawingStorageImages } from '@constants'

export function draw(canvasContext, type, payload, shouldStore = true) {
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
    if (shouldStore) storeCanvasElement(type, payload)
}

export function restoreFromStorage(canvasContext) {
    const elems = JSON.parse(window.localStorage.getItem('elementCoords')) ?? []

    elems.forEach((elem) => draw(canvasContext, elem.type, elem, false))
}

export function downloadCanvas(canvas) {
    window.location = canvas.toDataUrl('image/png')
}

export function shouldHighlight(canvasContext, { xCoord, yCoord }) {
    const storage = getElementStorage()

    for (let image of storage) {
        if (image.type === DrawableTypes.Circle) {
            image.isHovered =
                Math.round(
                    Math.sqrt(
                        Math.pow(xCoord - +image.xCoord, 2) +
                            Math.pow(yCoord - +image.yCoord, 2)
                    )
                ) <= +image.radius
        } else {
            const offsetX = +image.xCoord + +image.width

            const offsetY = +image.yCoord + +image.height

            image.isHovered =
                xCoord >= +image.xCoord &&
                xCoord <= offsetX &&
                yCoord >= +image.yCoord &&
                yCoord <= offsetY
        }
        setElementStorage(storage)
        drawWhenHoveredOrSelected(canvasContext)
    }
}

export function shouldSelect(canvasContext, allowMultiSelect) {
    const storage = getElementStorage()
    if (storage.every((image) => !image.isHovered)) {
        for (let image of storage) {
            image.isSelected = false
        }
    } else {
        for (let image of storage) {
            image.isSelected = image.isHovered || (allowMultiSelect && image.isSelected)
        }
    }
    setElementStorage(storage)
    drawWhenHoveredOrSelected(canvasContext)
}

export function shouldMoveSelected(canvasContext, { mouseOriginXCoord, mouseOriginYCoord, currentMouseXCoord, currentMouseYCoord }) {
    const storage = getElementStorage()

    //there are issues with drag where drag is very accelerated. need to investigate
    for (let image of storage) {
        if (image.isSelected) {
            let imageX = parseInt(image.xCoord) + (currentMouseXCoord - mouseOriginXCoord)
            let imageY = parseInt(image.yCoord) + (currentMouseYCoord - mouseOriginYCoord)

            image.xCoord = imageX 
            image.yCoord = imageY
        }
    }
    setElementStorage(storage)
    canvasContext.reset()
    restoreFromStorage(canvasContext)
}

function drawWhenHoveredOrSelected(canvasContext) {
    for (let image of getElementStorage()) {
        canvasContext.shadowBlur = 5
        canvasContext.fillStyle = 'skyblue'
        canvasContext.shadowColor =
            image.isHovered || image.isSelected ? 'skyblue' : '#ffffff'
        draw(
            canvasContext,
            image.type,
            {
                ...image,
                width: +image.width,
                height: +image.height,
                radius: +image.radius,
            },
            false
        )
    }
}

function createRectangle(
    canvasContext,
    { xCoord, yCoord, width, height, color }
) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(xCoord, yCoord, width, height)
    canvasContext.closePath()
}

function createCircle(canvasContext, { xCoord, yCoord, radius, color }) {
    canvasContext.fillStyle = color
    canvasContext.arc(xCoord, yCoord, radius, 0, 2 * Math.PI)
    canvasContext.fill()
    canvasContext.closePath()
}

function storeCanvasElement(type, payload) {
    const guid = crypto.randomBytes(16).toString("hex")
    const storedCoords = getElementStorage()

    const expanded = {
        ...payload,
        type,
        isHovered: false,
        isSelected: false,
        guid: payload.guid ?? guid
    }

    if (!storedCoords.some((elem) => elem === expanded))
        storedCoords.push(expanded)

    setElementStorage(storedCoords)
}

export function getElementStorage() {
    return JSON.parse(window.localStorage.getItem(DrawingStorageImages)) ?? []
}

function setElementStorage(elements) {
    window.localStorage.setItem(DrawingStorageImages, JSON.stringify(elements))
}
