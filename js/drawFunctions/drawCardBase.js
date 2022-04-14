let drawCardBase = (x, y, title) => {
    ctx.fillStyle = "white"
    ctx.fillRect(x, y , canvas.width/10 - 15, canvas.height/34 )
    ctx.fillRect(x, y, canvas.width/200, canvas.height/3.4 - 15 )
    ctx.fillRect(x, y + canvas.height/6.8, canvas.width/10 - 15, canvas.height/6.8 - 15)
    ctx.fillStyle = "black"
    ctx.font = "25px ariel"
    ctx.fillText(title, x + 10 , y + canvas.height/45)
}