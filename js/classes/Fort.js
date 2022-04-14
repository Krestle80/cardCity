class Fort extends Building{
    constructor(position, align){
        super(2, 1, 0, "fort", position, align)
    }
    draw(x, y){
        let fortColor = ""
        if(this.align === "red"){
            fortColor = "black"
            ctx.strokeStyle = "black"
        } 
        else {
            fortColor= "white"
            ctx.strokeStyle = "#2762b5"
        }
        
        drawFort(x,y, fortColor, this.health)

    }
    build(){
        playerGpt +=1
        playerGold -=2
        console.log("built")
    }
}