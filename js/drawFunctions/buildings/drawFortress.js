let drawFortress = (x, y, fortress, context, scale) =>{
        context.save()
        context.translate(x, y)
        context.lineWidth = 3*scale
        if(fortress.align ==="blue"){
            context.strokeStyle = "#2762b5"
            context.fillStyle = "white"
        }
        else {
            context.strokeStyle = "#a64646"
            context.fillStyle = "black"
        }
        //main shape
        context.fillRect(0, 0, canvas.width/40*scale, canvas.width/40*scale)
        context.strokeRect(0, 0, canvas.width/40*scale, canvas.width/40*scale)
        //health
        context.fillStyle = "#940404"

        context.fillRect(canvas.width/360*scale, canvas.width/360*scale, canvas.width/120*scale, canvas.width/120*scale)
        if(fortress.health > 1){
            context.fillRect(2*canvas.width/360*scale + canvas.width/120*scale, canvas.width/360*scale, canvas.width/120*scale, canvas.width/120*scale)
            if(fortress.health > 2){
                context.fillRect(canvas.width/360*scale, 2*canvas.width/360*scale + canvas.width/120*scale, canvas.width/120*scale, canvas.width/120*scale)
                if(fortress.health > 3){
                    context.fillRect(2*canvas.width/360*scale + canvas.width/120*scale, 2*canvas.width/360*scale + canvas.width/120*scale, canvas.width/120*scale, canvas.width/120*scale)       
                }
            }
        }
        context.restore()
}