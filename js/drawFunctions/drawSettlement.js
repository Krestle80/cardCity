function drawSettlement(cx, cy, scale, settlement) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / 5;
    let outerRadius = canvas.width/60*scale
    let innerRadius = canvas.width/140*scale
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < 5; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=5;
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
    ctx.strokeStyle = stroke
    ctx.fillStyle = fill
    ctx.stroke();
    
    ctx.fill();
    ctx.restore()
    health = settlement.health
    let healthInnerRadius = innerRadius/1.5
    let healthOuterRadius = outerRadius/1.5
    let healthRot = Math.PI / 2 * 3
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(cx, cy - healthOuterRadius)
    if(settlement.health <= 3)(
        health = 4
    )
    for (i = 0; i < health; i++) {
        x = cx + Math.cos(healthRot) * (healthOuterRadius+2);
        y = cy + Math.sin(healthRot) * (healthOuterRadius+2);
        ctx.lineTo(x, y)
        healthRot += step

        x = cx + Math.cos(healthRot) * healthInnerRadius;
        y = cy + Math.sin(healthRot) * healthInnerRadius;
        ctx.lineTo(x, y)
        healthRot += step
    }
    ctx.lineTo(cx, cy - healthOuterRadius)
    ctx.closePath();
    ctx.lineWidth=2;
    ctx.fillStyle='#940404';
    ctx.fill();
    ctx.restore()

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
        ctx.lineWidth = 2
        ctx.moveTo(cx,cy)
        g = cx + Math.cos(divideRot) * healthInnerRadius;
        h = cy + Math.sin(divideRot) * healthInnerRadius;
        ctx.lineTo(g, h)
        ctx.strokeStyle = fill
        ctx.stroke()
        divideRot += step*2
    }

}

//function for drawing a settlement with lower helath 
let removeHealthSegment = (x,y,angle, fill)=>{
    ctx.save()
    ctx.translate(x,y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo( canvas.height/280, -canvas.height/180)
    ctx.lineTo(-canvas.height/280, -canvas.height/180)
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.restore()

}