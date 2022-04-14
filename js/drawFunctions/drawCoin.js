let drawCoin = (x, y, radius ) =>{
    ctx.save()
    ctx.strokeStyle = "black"
    ctx.lineWidth = radius/2
    ctx.fillStyle = "gold"
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = "khaki"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x, y, radius/2, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
}