function drawSettlement(cx, cy, scale, settlement) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / 5;
    let outerRadius = canvas.width/60*scale
    let innerRadius = canvas.width/140*scale
    ctx.strokeSyle = "black";
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
    ctx.strokeStyle='#2762b5';
    ctx.stroke();
    ctx.fillStyle='white';
    ctx.fill();
    ctx.restore()
    health = settlement.health
    let healthInnerRadius = innerRadius/2
    let healthOuterRadius = outerRadius/2

    ctx.save()
    ctx.beginPath();
    ctx.moveTo(cx, cy - healthOuterRadius)
    if(settlement.health <= 3)(
        health = 4
    )
    for (i = 0; i < health; i++) {
        x = cx + Math.cos(rot) * healthOuterRadius;
        y = cy + Math.sin(rot) * healthOuterRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * healthInnerRadius;
        y = cy + Math.sin(rot) * healthInnerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - healthOuterRadius)
    ctx.closePath();
    ctx.lineWidth=1;
    ctx.fillStyle='#940404';
    ctx.fill();
    ctx.restore()

    if(settlement.health < 5){
        removeHealthSegment(cx, cy, - (Math.PI / 5)*2 )
    }    
    if(settlement.health < 4 ){
        removeHealthSegment(cx, cy, - (Math.PI / 5)*4 )
    }
    if(settlement.health < 3 ){
        removeHealthSegment(cx, cy, (Math.PI / 5)*4 )
    }
    if(settlement.health < 2 ){
        removeHealthSegment(cx, cy,  (Math.PI / 5)*2 )
    }
    let divideRot = step/2
    
    for(i = 0; i < 5; i ++){
        ctx.moveTo(cx,cy)
        g = cx + Math.cos(divideRot) * healthInnerRadius;
        h = cy + Math.sin(divideRot) * healthInnerRadius;
        ctx.lineTo(g, h)
        ctx.strokeStyle = "white"
        ctx.stroke()
        divideRot += step*2
    }

}

//function for drawing a settlement with lower helath 
let removeHealthSegment = (x,y,angle)=>{
    ctx.save()
    ctx.translate(x,y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo( canvas.height/280, -canvas.height/190)
    ctx.lineTo(-canvas.height/280, -canvas.height/190)
    ctx.closePath()
    ctx.fillStyle = "white"
    ctx.fillRect(-canvas.height/280, -canvas.height/200, canvas.height/140, -canvas.height/85 )
    ctx.fill()
    ctx.restore()

}