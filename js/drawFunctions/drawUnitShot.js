let drawUnitShot = (x,y, unit)=>{
    ctx.beginPath()
    ctx.save()
    ctx.translate( x + canvas.width/20.4, y + canvas.height/20)
    if(angle > 0){
        ctx.rotate(Math.PI)
    }
    ctx.fillStyle = "red"
    
    var shotGradient = ctx.createRadialGradient( 0, -canvas.height/27,unit.shotRadius/5, 0, -canvas.height/27,unit.shotRadius);
    
    shotGradient.addColorStop(.0, '#940404');
    shotGradient.addColorStop(.3, '#c49a45');
    shotGradient.addColorStop(1, 'white');
    ctx.fillStyle = shotGradient
    ctx.arc(0, -canvas.height/27, unit.shotRadius, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
    ctx.closePath()
    
    
}