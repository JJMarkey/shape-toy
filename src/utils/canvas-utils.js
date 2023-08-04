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
            const centerX = +image.xCoord + +image.radius
            const centerY = +image.yCoord + +image.radius

            image.isHovered =
                Math.round(
                    Math.sqrt(
                        Math.pow(xCoord - centerX, 2) +
                            Math.pow(yCoord - centerY, 2)
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
        setElementStorage(storage);
        drawWhenHoveredOrSelected(canvasContext);
    }
}

export function shouldSelect(canvasContext, allowMultiSelect){
    const storage = getElementStorage()
    if(storage.every(image=>!image.isHovered)){
        for(let image of storage){
            image.isSelected = false;
        }
    }
    else{
        for (let image of storage) {
            if(image.isHovered || (allowMultiSelect && image.isSelected))
                image.isSelected = true; 
            else
                image.isSelected = false;
        }
    }
    setElementStorage(storage);
    drawWhenHoveredOrSelected(canvasContext)
}

function drawWhenHoveredOrSelected(canvasContext){
    for(let image of getElementStorage()){
        canvasContext.shadowBlur = 5
        canvasContext.fillStyle = 'skyblue'
        canvasContext.shadowColor = (image.isHovered || image.isSelected) ? 'skyblue' : '#ffffff'
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
    const storedCoords = getElementStorage()

    const stringifiedPayload = {
        ...payload,
        type,
        isHovered: false,
        isSelected: false,
    }

    if (!storedCoords.some((elem) => elem === stringifiedPayload))
        storedCoords.push(stringifiedPayload)

    setElementStorage(storedCoords)
}

function getElementStorage() {
    return JSON.parse(window.localStorage.getItem(DrawingStorageImages)) ?? []
}

function setElementStorage(elements) {
    window.localStorage.setItem(DrawingStorageImages, JSON.stringify(elements))
}
