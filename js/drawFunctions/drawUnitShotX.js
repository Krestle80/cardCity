let drawUnitShotX = (x, y, angle, unit) => {
    ctx.beginPath()
    ctx.save()
    
    ctx.fillStyle = "red"
    ctx.translate( x + (canvas.width/20), y + canvas.height/20)
    ctx.rotate(angle*2)
    var shotGradient = ctx.createRadialGradient( 0, canvas.width/50,unit.shotRadius/5, 0, canvas.width/50,unit.shotRadius);
    
    shotGradient.addColorStop(.0, '#940404');
    shotGradient.addColorStop(.4, '#c49a45');
    shotGradient.addColorStop(.9, 'white');
    shotGradient.addColorStop(1, 'black');
    ctx.fillStyle = shotGradient
    ctx.arc(0, canvas.width/50, unit.shotRadius, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
    ctx.closePath()
}