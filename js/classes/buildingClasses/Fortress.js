class Fortress extends Building{
    constructor(position, align){
        super(4, 2, 0, "fortress", position, align)
    }
    draw(x,y){
        drawFortress(x + canvas.width/20 - canvas.width/80,y + canvas.height/20 - canvas.width/80,this, ctx, 1)
    }
}