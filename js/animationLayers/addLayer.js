let tempHolder = document.getElementById('tempHolder')
let addLayer = (canvasNum, className, parentClassName) =>{
    let layerHolder = document.createElement("div")
    layerHolder.className = parentClassName
    let layer = document.createElement("canvas")
    tempHolder.appendChild(layerHolder)
    layerHolder.appendChild(layer)
    let newCanvas = layer
    newCanvas.className = canvasNum + " " + className
    let canvasNameVar = document.getElementsByClassName(canvasNum)
    let canvasContextVar = canvas.getContext('2d')
    let canvasSetup = {canvasName : canvasNameVar, canvasContext: canvasContextVar }
    return canvasSetup
}