class Bank extends Building{
    constructor(position, align){
        super(5, 3, 0, "bank", position, align)
    }
    draw(x,y){
        drawBank(x + canvas.width/20, y + canvas.height/20, this, ctx, 1)
    }
}