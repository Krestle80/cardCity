class Armory extends Building{
    constructor(position, align){
        super(3, 0, 0, "armory", position, align)
    }
    draw(x,y){
        drawArmory(x + canvas.width/20, y + canvas.height/20, this, ctx, 1)
    }
}