let particleArray = ''
let handleUnitShotX = (x, y , angle, unit) =>{
    if(unit.shotInitiated === false){
        unit.shotX = x
        unit.shotInitiated = true
    }
    if(angle < 0){
        if(unit.shotX <= (x + canvas.width/12.5)){
            unit.shotX += 6
        }
        if(unit.shotX >= x + canvas.width/20 && unit.shotShrunk == false){
            unit.shotRadius -= 0.4
            if(unit.shotRadius < 0) unit.shotRadius = 0.1
        }
    }
    else {
        if(unit.shotX >= (x - canvas.width/12)) {
            unit.shotX -=6 
        }
        if(unit.shotX <= x - canvas.width/20 && unit.shotShrunk == false){
            unit.shotRadius -= 0.4
            if(unit.shotRadius < 0) unit.shotRadius = 0.1
        }
        
    }
    if(unit.shotRadius < 0.2 ) unit.shotShrunk = true
    if(unit.shotRadius < canvas.height/20){
        drawUnitShotX(unit.shotX,y,angle,unit)
    }
    if(unit.shotShrunk == true && unit.shotRadius < canvas.height/20){
        unit.shotRadius += 10
    }
    if(unit.shotRadius > canvas.height/35 && unit.shotParticlesInitiated == false){
        if(angle < 0)unit.particles = new ShotParticleArray(unit.shotX + canvas.width/15 ,y + canvas.height/20 ,100)
        else unit.particles = new ShotParticleArray(unit.shotX + canvas.width/35 ,y + canvas.height/20 ,100)
        unit.particles.makeArray()
        unit.shotParticlesInitiated = true  
    }
    if(unit.shotParticlesInitiated == true){
        unit.particles.draw()
        unit.particles.update()
        if(unit.particles.array.length < 3){
            unit.shooting = false
            Unit.prototype.attack.call(unit, unit.target)
        }
    }
}
