// base fully prepped unit for display on card
let baseManiple = new Maniple(0,0, "blue")
baseManiple.energy = 2
baseManiple.loaded = true

let drawManipleCard = (x, y) => {
    ctx.fillText("1", x + canvas.width/14, y + canvas.height/45)
    drawCoin(x+ canvas.width/11.85, y + canvas.height/65, canvas.height/120)
    drawUnitX(-(Math.PI/4), "white", x - canvas.width/100 , y + canvas.height/30 , baseManiple)

    drawSword(x + canvas.width/55, y + canvas.height/4.7, "right")
    drawSword(x + canvas.width/34, y + canvas.height/4.55, "left")
    ctx.fillStyle = "black"
    ctx.font = "40px ariel"
    ctx.fillText("1", x + canvas.width/15, y + canvas.height/4.5)


}