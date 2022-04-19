let layerHolder = document.getElementById('tempHolder')
let addLayer = (canvasNum, className) =>{
    let layer = document.createElement("canvas")
    layerHolder.appendChild(layer)
    let newCanvas = layerHolder.firstChild
    newCanvas.className = canvasNum + " " + className
}