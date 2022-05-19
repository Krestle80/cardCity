let drawWallCard = (x, y) => {
    ctx.fillText("2", x + canvas.width/14, y + canvas.height/45)
    drawCoin(x+ canvas.width/11.85, y + canvas.height/65, canvas.height/120)
    drawWall(x + canvas.width/30 , y + canvas.height/27 , ctx, drawingWall, 1)

    // ctx.fillStyle = "black"
    // ctx.font = "40px ariel"
    // drawCoin(x + canvas.width/45, y + canvas.height/4.8, canvas.height/60)
    // ctx.fillText("1pt", x + canvas.width/18, y + canvas.height/4.5)

    // drawCoin(x + canvas.width/45, y + canvas.height/4.8, canvas.height/60)
    // ctx.fillText("1pt", x + canvas.width/18, y + canvas.height/4.5)

}