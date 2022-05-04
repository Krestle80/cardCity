let drawArmory = (x, y, armory, context, scale) =>{

    let angle = 2*Math.PI/3
    let radius = canvas.width/60*scale
    context.save()
    if(armory.align ==="blue"){
        context.strokeStyle = "#2762b5"
        context.fillStyle = "white"
    }
    else {
        context.strokeStyle = "#a64646"
        context.fillStyle = "black"
    }
    context.lineWidth = 3*scale
    context.translate(x,y)
    context.beginPath()
    context.moveTo(radius*Math.sin(0)*scale, -radius*Math.cos(0)*scale)
    for(i=1; i < 4; i ++){
        context.lineTo(radius*Math.sin(angle*i)*scale, -radius*Math.cos(angle*i)*scale)
    }
    context.fill()
    context.stroke()
    context.closePath()
    //health triangle
    let healthRadius = canvas.width/100*scale
    context.fillStyle = "#940404"
    context.beginPath()
    context.moveTo(healthRadius*Math.sin(0)*scale, -healthRadius*Math.cos(0)*scale)
    for(i=1; i < 4; i ++){
        context.lineTo(healthRadius*Math.sin(angle*i)*scale, -healthRadius*Math.cos(angle*i)*scale)
    }
    context.fill()
    context.closePath()
    context.beginPath()
    context.strokeStyle = "white"
    context.lineWidth = 3*scale
    //health dividers
    for (i = 0; i < 5; i++) {
        context.moveTo (0, 0);
        context.lineTo(healthRadius*Math.sin(i*angle)*scale/2, healthRadius*Math.cos(i*angle)*scale/2)
        context.stroke()
    }
    let healthCover = (missingHealth) =>{
        context.fillStyle = "white"
        context.strokeStyle = "white"
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(healthRadius*Math.sin(missingHealth*angle)*scale/2, healthRadius*Math.cos(missingHealth*angle)*scale/2)
        context.lineTo(healthRadius*Math.sin(angle*missingHealth)*scale, -healthRadius*Math.cos(angle*missingHealth)*scale)
        if(missingHealth == 1)context.lineTo(healthRadius*Math.sin((missingHealth + 2)*angle)*scale/2, healthRadius*Math.cos((missingHealth + 2)*angle)*scale/2)
        else context.lineTo(healthRadius*Math.sin((missingHealth + 1)*angle)*scale/2, healthRadius*Math.cos((missingHealth + 1)*angle)*scale/2)
        context.fill()
        context.stroke()
        context.closePath()
    }

    //handles covering health
    if(armory.health < 3 ){
        healthCover(1)
        if(armory.health < 2){
            healthCover(2)
        }
    }

    context.closePath()
    context.restore()
}