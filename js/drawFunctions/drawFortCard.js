let drawFortCard = (x,y) =>{
    ctx.fillText("2", x + canvas.width/14, y + canvas.height/45)
    drawCoin(x+ canvas.width/11.85, y + canvas.height/65, canvas.height/120)
    drawFort(x + canvas.width/1000, y + canvas.height/30, "white", 2)
    ctx.fillStyle = "black"
    ctx.font = "40px ariel"
    //description
    drawCoin(x + canvas.width/45, y + canvas.height/4.8, canvas.height/60)
    ctx.fillText("1pt", x + canvas.width/18, y + canvas.height/4.5)

}