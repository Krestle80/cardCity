let handleUnitShotY = (x, y, angle, unit) =>{
    if(unit.shotInitiated === false){
        unit.shotY = y
        unit.shotInitiated = true
    }
    if(angle > 0){
        if(unit.shotY <= (y + canvas.height/17)){
            unit.shotY += 6
        }
        if(unit.shotY >= y + canvas.height/25 && unit.shotShrunk == false){
            unit.shotRadius -= 0.4
            if(unit.shotRadius < 0) unit.shotRadius = 0.1
        }
    }
    else {
        if(unit.shotY >= (y - canvas.height/18)) {
            unit.shotY -=6 
        }
        if(unit.shotY <= y - canvas.height/20 && unit.shotShrunk == false){
            unit.shotRadius -= 0.4
            if(unit.shotRadius < 0) unit.shotRadius = 0.1
        }
        
    }
    if(unit.shotRadius < 0.2 ) unit.shotShrunk = true
    if(unit.shotRadius < canvas.height/20){
        drawUnitShotY(x, unit.shotY, angle, unit)
    }
    if(unit.shotShrunk == true && unit.shotRadius < canvas.height/20){
        unit.shotRadius += 10
    }
    if(unit.shotRadius > canvas.height/35 && unit.shotParticlesInitiated == false){
        if(angle > 0)unit.particles = new ShotParticleArray(x + canvas.width/20, unit.shotY + canvas.height/12 ,100)
        else unit.particles = new ShotParticleArray(x + canvas.width/20 , unit.shotY + canvas.height/45 ,100)
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