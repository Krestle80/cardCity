let playerTechTree = new Tech()

let drawTechScreen = () =>{
    techCtx.save()
    techCtx.shadowColor = "white"
    techCtx.shadowBlur = 20
    techCtx.fillStyle = "white"
    techCtx.fillRect(canvas.width/8, canvas.height/8, (canvas.width*3)/4, (canvas.height*3)/4)
    techCtx.restore()
    techCtx.lineWidth = 20
    techCtx.strokeStyle = "#6789b9"
    techCtx.strokeRect(canvas.width/8, canvas.height/8, (canvas.width*3)/4, (canvas.height*3)/4)
    playerTechTree.draw()
    playerTechTree.update()
}