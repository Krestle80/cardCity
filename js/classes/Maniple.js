//global variable to make move units "Bob"
let theta = 0
class Maniple extends Unit {
    constructor(position, tile, align){
        super(2, 1, 1, 2,  "maniple", position, tile, align)
        let shotX = 0
        let shotY = 0
    }
    draw( x, y ){
        let unitColor = ''
        if(this.align === "blue"){unitColor = "white"}
        else {unitColor = "black"
            }
        
        
        if (this.direction == "right"){
            drawUnitX(-(Math.PI/4), unitColor, x + 3*(Math.cos(theta)), y, this)
        }
        if (this.direction == "left"){
            drawUnitX((Math.PI/4), unitColor, x + 3*(Math.cos(theta)), y, this)
        }
        if (this.direction == "top"){
            drawUnitY((-Math.PI/4), unitColor, x, y + 3*(Math.cos(theta)), this)
        }
        if (this.direction == "bottom"){
            drawUnitY(Math.PI/4, unitColor, x, y + 3*(Math.cos(theta)), this)
        }
    }
    
    attack(target){
        return super.attack(target)
    }
    animateShot(){
        
    }
}