// drawing functions for unit subclasses

let drawUnitX = (angle, unitColor, x, y, unit) => {
    //base arrow
    ctx.strokeStyle = unitColor
    ctx.lineWidth = 10 
    ctx.beginPath()
    ctx.save()

    ctx.translate( x + canvas.width/20, y + canvas.height/45)
    ctx.rotate(angle)
    ctx.moveTo( 0 , 0 )
    ctx.lineTo(  0,   canvas.height/25)
    ctx.translate(0, canvas.height/25)
    ctx.rotate(angle*(-2))
    ctx.lineTo(0, canvas.height/25)
    ctx.restore()
    ctx.stroke()
    ctx.closePath()

    //path for energy bars
    if(unit.energy > 0){
        ctx.strokeStyle = unitColor
        
        ctx.beginPath()
        ctx.save()
        ctx.translate( x + canvas.width/20, y + canvas.height/45)
        ctx.rotate(angle)
        ctx.moveTo( 0 , 0 )
        ctx.lineTo(  0,   canvas.height/25)
        ctx.translate(0, canvas.height/25)
        ctx.stroke()
        ctx.closePath()
        ctx.rotate(angle*(-2))
        ctx.beginPath()
        ctx.strokeStyle= "#c49a45"
        ctx.lineTo(0, canvas.height/220)
        ctx.lineTo(0, canvas.height/60)
        ctx.stroke()
        ctx.closePath()
    
    if(unit.energy > 1 ){
        ctx.beginPath()
        ctx.moveTo( 0,  canvas.height/29)
        ctx.lineTo( 0 , canvas.height/45)
        ctx.stroke()
        ctx.closePath()
    }
    ctx.restore()

    }


    //path for health bars

    ctx.strokeStyle= "#940404"
    ctx.beginPath()
    ctx.save()
    ctx.translate( x + canvas.width/20, y + canvas.height/45)
    ctx.rotate(angle)
    ctx.moveTo( 0, + canvas.height/29)
    ctx.lineTo( 0 , canvas.height/45 )
    ctx.restore()
    ctx.stroke()
    ctx.closePath()
    if(unit.health == 2 ){
        //second health bar
        ctx.strokeStyle= "#940404"
        ctx.beginPath()
        ctx.save()
        ctx.translate( x + canvas.width/20, y + canvas.height/45)
        ctx.rotate(angle)
        ctx.moveTo( 0, + canvas.height/220)
        ctx.lineTo( 0 , canvas.height/60 )
        ctx.restore()
        ctx.stroke()
        ctx.closePath()
    }

    //circle for shot
    if(unit.loaded == true){
        drawUnitShotX(x, y, angle, unit)
        unit.shotX = x
        unit.shotY = y
    }
    //function for shot animation
    if(unit.shooting == true){
        handleUnitShotX(x, y, angle, unit)
    }
}
let drawUnitY = (angle, unitColor, x, y, unit) => {
//base arrow
ctx.strokeStyle = unitColor
ctx.lineWidth = 10 
ctx.beginPath()
ctx.save()
ctx.translate( x + canvas.width/30, y + canvas.height/20)
ctx.rotate(angle)
ctx.moveTo(0 , 0)
ctx.lineTo(canvas.height/25, 0  )
ctx.translate(canvas.height/25, 0 )
ctx.rotate(angle*(-2))
ctx.lineTo(canvas.height/25, 0)
ctx.restore()
ctx.stroke()
ctx.closePath()

//path for energy bars
if(unit.energy > 0){
ctx.strokeStyle = unitColor

ctx.beginPath()
ctx.save()
ctx.translate( x + canvas.width/30, y + canvas.height/20)
ctx.rotate(angle)
ctx.moveTo( 0 , 0 )
ctx.lineTo(canvas.height/25, 0)
ctx.translate(canvas.height/25, 0)
ctx.stroke()
ctx.closePath()
ctx.rotate(angle*(-2))
ctx.beginPath()
ctx.strokeStyle= "#c49a45"
ctx.lineTo(canvas.height/220, 0)
ctx.lineTo(canvas.height/60, 0 )
ctx.stroke()
ctx.closePath()

if(unit.energy > 1 ){
    ctx.beginPath()
    ctx.moveTo(canvas.height/29, 0)
    ctx.lineTo( canvas.height/45, 0)
    ctx.stroke()
    ctx.closePath()
}
ctx.restore()
}


//path for health bars

ctx.strokeStyle= "#940404"
ctx.beginPath()
ctx.save()
ctx.translate( x + canvas.width/30, y + canvas.height/20)
ctx.rotate(angle)
ctx.moveTo( canvas.height/29, 0)
ctx.lineTo( canvas.height/45, 0)
ctx.restore()
ctx.stroke()
ctx.closePath()
if(unit.health == 2 ){
//second health bar
ctx.strokeStyle= "#940404"
ctx.beginPath()
ctx.save()
ctx.translate( x + canvas.width/30, y + canvas.height/20)
ctx.rotate(angle)
ctx.moveTo( canvas.height/220, 0 )
ctx.lineTo( canvas.height/60 , 0 )
ctx.restore()
ctx.stroke()
ctx.closePath()
}
if(unit.loaded == true){
    drawUnitShotY(x,y, angle, unit)
}
if(unit.shooting === true){
    handleUnitShotY(x, y, angle, unit)
}
}