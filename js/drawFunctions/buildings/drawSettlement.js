function drawSettlement(cx, cy, scale, settlement, context) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / 5;
    let outerRadius = canvas.width/60*scale
    let innerRadius = canvas.width/140*scale
    context.save()
    context.beginPath();
    context.moveTo(cx, cy - outerRadius)
    for (i = 0; i < 5; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y)
        rot += step
    }
    context.lineTo(cx, cy - outerRadius)
    context.closePath();
    context.lineWidth=5;
    let stroke = ""
    let fill = ""
    if(settlement.align === "blue"){
        stroke = "#2762b5"
        fill ='white';
    }
    else {
        stroke = "#a64646"
        fill = "black"
    }
    context.strokeStyle = stroke
    context.fillStyle = fill
    context.stroke();
    
    context.fill();
    context.restore()
    health = settlement.health
    let healthInnerRadius = innerRadius/1.5
    let healthOuterRadius = outerRadius/1.5
    let healthRot = Math.PI / 2 * 3
    context.save()
    context.beginPath();
    context.moveTo(cx, cy - healthOuterRadius)
    if(settlement.health <= 3)(
        health = 4
    )
    for (i = 0; i < health; i++) {
        x = cx + Math.cos(healthRot) * (healthOuterRadius+2);
        y = cy + Math.sin(healthRot) * (healthOuterRadius+2);
        context.lineTo(x, y)
        healthRot += step

        x = cx + Math.cos(healthRot) * healthInnerRadius;
        y = cy + Math.sin(healthRot) * healthInnerRadius;
        context.lineTo(x, y)
        healthRot += step
    }
    context.lineTo(cx, cy - healthOuterRadius)
    context.closePath();
    context.lineWidth=2;
    context.fillStyle='#940404';
    context.fill();
    context.restore()

    if(settlement.health < 5){
        removeHealthSegment(cx, cy, - (Math.PI / 5)*2, fill )
    }    
    if(settlement.health < 4 ){
        removeHealthSegment(cx, cy, - (Math.PI / 5)*4, fill )
    }
    if(settlement.health < 3 ){
        removeHealthSegment(cx, cy, (Math.PI / 5)*4, fill )
    }
    if(settlement.health < 2 ){
        removeHealthSegment(cx, cy,  (Math.PI / 5)*2, fill )
    }
    let divideRot = step/2
    
    for(i = 0; i < 5; i ++){
        context.lineWidth = 2
        context.moveTo(cx,cy)
        g = cx + Math.cos(divideRot) * healthInnerRadius;
        h = cy + Math.sin(divideRot) * healthInnerRadius;
        context.lineTo(g, h)
        context.strokeStyle = fill
        context.stroke()
        divideRot += step*2
    }

}

//function for drawing a settlement with lower helath 
let removeHealthSegment = (x,y,angle, fill)=>{
    context.save()
    context.translate(x,y)
    context.rotate(angle)
    context.beginPath()
    context.moveTo(0,0)
    context.lineTo( canvas.height/280, -canvas.height/150)
    context.lineTo(-canvas.height/280, -canvas.height/150)
    context.closePath()
    context.fillStyle = fill
    context.fill()
    context.beginPath()
    context.moveTo(0, -canvas.height/45)
    context.lineTo( canvas.height/190, -canvas.height/150)
    context.lineTo(-canvas.height/190, -canvas.height/150)
    context.closePath()
    context.fill()    
    context.restore()

}