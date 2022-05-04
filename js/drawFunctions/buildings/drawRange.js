let drawRange = (x, y, range, context, scale) => {
    context.save()
    if(range.align ==="blue"){
        context.strokeStyle = "#2762b5"
        context.fillStyle = "white"
    }
    else {
        context.strokeStyle = "#a64646"
        context.fillStyle = "black"
    }
    context.lineWidth = 5*scale
    context.translate(x, y)
    //baseShape
    context.beginPath()
    context.arc(0,0, canvas.width/60*scale, 0, 2*Math.PI)
    context.fill()
    context.stroke()
    context.closePath()
    //health circle
    context.fillStyle = "#940404"
    context.beginPath()
    context.arc(0, 0, canvas.width/90*scale, 0, 2*Math.PI)
    context.fill()
    context.closePath()
    //divider
    context.strokeStyle = "white"
    context.beginPath()
    context.moveTo(0, -canvas.width/90*scale)
    context.lineTo(0, canvas.width/90*scale)
    context.stroke()
    context.closePath()
    //healthCover
    if(range.health < 2){
        context.fillStyle ="white"
        context.beginPath()
        context.arc(0, 0, canvas.width/85*scale, 3*Math.PI/2, Math.PI/2)
        context.fill()
        context.closePath()
    }
    context.restore()
}