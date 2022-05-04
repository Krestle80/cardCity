let drawBank = (x, y, bank,  context, scale) =>{
    //base shape
    let angle = 2*Math.PI/5
    let radius = canvas.width/60*scale
    context.save()
    if(bank.align ==="blue"){
        context.strokeStyle = "#2762b5"
        context.fillStyle = "white"
    }
    else {
        context.strokeStyle = "#a64646"
        context.fillStyle = "black"
    }
    context.lineWidth = 5*scale
   
    context.translate(x,y)
    context.beginPath();
    context.moveTo (radius*Math.cos(-Math.PI/11)*scale,radius*Math.sin(-Math.PI/11)*scale);
    for (i = 0; i < 6; i++) {
        context.lineTo(radius*Math.cos(i*angle-Math.PI/11)*scale,radius*Math.sin(i*angle-Math.PI/11)*scale)
    }
    context.stroke()
    context.fill()
    context.closePath();
    //health pentagon
    
    let healthRadius = canvas.width/80*scale
    context.beginPath()
    context.moveTo (healthRadius*Math.cos(-Math.PI/11)*scale, healthRadius*Math.sin(-Math.PI/11)*scale);
    for (i = 0; i < 5; i++) {
        context.lineTo(healthRadius*Math.cos(i*angle-Math.PI/11)*scale, healthRadius*Math.sin(i*angle-Math.PI/11)*scale)
    }
    context.fillStyle = "#940404"
    context.fill()
    context.closePath()

    //health dividing bars
    context.beginPath()
    context.strokeStyle = "white"
    context.lineWidth = 3*scale
    for (i = 0; i < 5; i++) {
        context.moveTo (0, 0);
        context.lineTo(healthRadius*Math.cos(i*angle-Math.PI/11)*scale, healthRadius*Math.sin(i*angle-Math.PI/11)*scale)
        context.stroke()
    }
    // triangles to lower health
    let middleRadius = canvas.width/74*scale
    if(bank.health < 5){
        healthTriangle(1, middleRadius, context, scale)
        if(bank.health < 4){
            healthTriangle(2, middleRadius, context, scale)
            if(bank.health < 3){
                healthTriangle(3, middleRadius, context, scale)
                if(bank.health < 2){
                    healthTriangle(4,middleRadius,context, scale)
                }
            }
        }
    }

   
    context.closePath()
    context.restore()
}

//helper function to draw over health triangles

let healthTriangle = (missingHealth, middleRadius, context, scale) => {
    let angleOne = (missingHealth - 1)*(2*Math.PI/5) - Math.PI/11
    let angleTwo = (missingHealth - 2)*(2*Math.PI/5) - Math.PI/11
    context.fillStyle = "white"
    context.beginPath()
    context.moveTo(0,0)
    context.lineTo(middleRadius*Math.cos(angleOne)*scale, middleRadius*Math.sin(angleOne)*scale)
    context.lineTo(middleRadius*Math.cos(angleTwo)*scale, middleRadius*Math.sin(angleTwo)*scale)
    context.fill()
    context.closePath()
}