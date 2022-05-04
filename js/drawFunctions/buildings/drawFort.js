let drawFort = (x,y, color, fortHealth) => {
    ctx.fillStyle = color
    ctx.lineWidth = 2
    ctx.save()
    ctx.translate(x + canvas.width/20, y + canvas.height/34)
    ctx.rotate(Math.PI/4)
    ctx.fillRect(0, 0, canvas.width/60, canvas.width/60)
    if(color ==="white"){
        ctx.strokeStyle = "#2762b5"
    }
    else ctx.strokeStyle = "#a64646"
    ctx.strokeRect(0, 0, canvas.width/60, canvas.width/60)
    ctx.fillStyle = "#940404"
    ctx.beginPath()
    ctx.moveTo(5,8)
    ctx.lineTo(5, canvas.width/60 - 5 )
    ctx.lineTo(canvas.width/60 - 8, canvas.width/60 - 5)
    ctx.closePath()
    ctx.fill()
    if(fortHealth > 1){
        ctx.beginPath()
        ctx.moveTo(8, 5)
        ctx.lineTo(canvas.width/60 - 5,  5)
        ctx.lineTo(canvas.width/60 - 5, canvas.width/60 - 8)
        ctx.closePath()
        ctx.fill()
        
    }
    ctx.restore()
}