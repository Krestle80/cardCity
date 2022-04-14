let drawSword = (x, y, direction) => {
    ctx.save()
    ctx.translate(x,y)
    let angle = 0 
    if(direction === "right") angle = Math.PI/4
    if(direction === "left") angle = -Math.PI/4
    //blade
    ctx.rotate(angle)
    ctx.fillStyle = "silver"
    ctx.fillRect(0,0, canvas.width/400, -canvas.height/30)
    ctx.fillStyle = "dimGray"
    ctx.fillRect(canvas.width/400,0, canvas.width/400, -canvas.height/30)
    ctx.fillStyle = "silver"
    ctx.beginPath()
    ctx.moveTo(0, -canvas.height/30)
    ctx.lineTo(canvas.width/400, -canvas.height/30)
    ctx.lineTo(canvas.width/400, -canvas.height/25)
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = "dimGray"
    ctx.beginPath()
    ctx.moveTo(canvas.width/200, -canvas.height/30)
    ctx.lineTo(canvas.width/400, -canvas.height/30)
    ctx.lineTo(canvas.width/400, -canvas.height/25)
    ctx.fill()
    ctx.closePath()
    ctx.lineWidth = 2
    //blade outline
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0, -canvas.height/30)
    ctx.lineTo(canvas.width/400, -canvas.height/25)
    ctx.lineTo(canvas.width/200, -canvas.height/30)
    ctx.lineTo(canvas.width/200, 0)
    ctx.stroke()
    ctx.closePath()

    //inner blade line
    ctx.lineWidth = 0.75
    ctx.beginPath()
    ctx.moveTo(canvas.width/400, 0)
    ctx.lineTo(canvas.width/400, -canvas.height/35)
    ctx.lineTo(0, -canvas.height/30)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.moveTo(canvas.width/400, -canvas.height/35)
    ctx.lineTo(canvas.width/200, -canvas.height/30)
    ctx.stroke()
    ctx.closePath()


    //hilt
    ctx.fillStyle = "saddlebrown"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.ellipse(canvas.width/400,canvas.height/90, canvas.width/800, canvas.height/90, 0, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.fillStyle = "black"
    ctx.fillRect(-canvas.width/300, 0, canvas.width/85, canvas.height/200)

    
    ctx.restore()

}