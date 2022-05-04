class BuildingRange extends Building{
    constructor(position, align){
        super(2, 0, 0, "range", position, align)
    }
    draw(x,y){
        drawRange(x + canvas.width/20, y + canvas.height/20, this, ctx, 1)
    }
}