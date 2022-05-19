let drawBankCard = (x,y) =>{
    ctx.fillText("4", x + canvas.width/14, y + canvas.height/45)
    drawCoin(x+ canvas.width/11.85, y + canvas.height/65, canvas.height/120)
    drawBank(x + canvas.width/21, y + canvas.height/12, drawingBank, ctx, 1)
    ctx.fillStyle = "black"
    ctx.font = "40px ariel"
    //description
    drawCoin(x + canvas.width/45, y + canvas.height/4.8, canvas.height/60)
    ctx.fillText("3pt", x + canvas.width/18, y + canvas.height/4.5)

}