class Settlement extends Building{
    constructor(position, align){
        super(5, 1, 1, "settlement", position, align)
    }
    draw(x,y){
        drawSettlement(x + canvas.width/20,y + canvas.height/20,1, this, ctx)
    }
}