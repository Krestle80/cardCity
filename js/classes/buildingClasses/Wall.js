class Wall extends Building{
    constructor(position, align){
        super(2, 0, 0, "wall", position, align)
    }
    draw(x, y){
        drawWall(x + canvas.width/20 - canvas.width/80, y, ctx, this, 1)
    }
}