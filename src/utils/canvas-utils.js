import {
    DrawableTypes
} from "@enums";

export function createRectangle(canvasContext, xCoord, yCoord, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(xCoord, yCoord, width, height);

    storeCanvasElement(DrawableTypes.Rectangle, xCoord, yCoord)
}

export function createCircle(canvasContext, xCoord, yCoord, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.arc(xCoord, yCoord, radius);
    canvasContext.stroke();
    canvasContext.fill();

    storeCanvasElement(DrawableTypes.Circle, xCoord, yCoord)
}

export function editColor(canvasContext, color) {

}

function e() {

}

function storeCanvasElement(elementKind, xCoord, yCoord) {
    const currStoredCoords = window.localStorage.getItem(elementKind);
    currStoredCoords.push([xCoord, yCoord]);
    window.localStorage.setItem(elementKind, currStoredCoords);
}