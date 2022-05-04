let drawWall = (x, y, context, wall, scale) => {
    context.fillStyle ="white"
    context.fillRect(x,y, canvas.width/40*scale, canvas.height/10*scale)
    context.fillStyle = "#940404"
    context.fillRect(x + canvas.width/160*scale, y + canvas.height/160*scale, canvas.width/80*scale, canvas.height/25*scale)
    if(wall.health === 2 ){
        context.fillRect(x + canvas.width/160*scale, y + canvas.height/75*scale + canvas.height/25*scale, canvas.width/80*scale, canvas.height/25*scale)
    }
}