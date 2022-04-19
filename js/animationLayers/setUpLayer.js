let layerSetup = (canvasName, canvasContext, canvasNum)=> {

    let canvasNameVar = document.getElementsByClassName(canvasNum)
    let canvasContextVar = canvas.getContext('2d')
    let newCanvas = {canvasName : canvasNameVar, canvasContext: canvasContextVar }
    return newCanvas
}