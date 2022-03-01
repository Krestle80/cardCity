class Unit {
    constructor(health, attack, range, maxEnergy, type, position, tile, align){
       this.health = health
       this.attack = attack
       this.attacked = true
       this.range = range
       this.energy = 0
       this.maxEnergy = maxEnergy
       this.direction = (align === 'blue') ? "right": "left" 
       this.type = type
       this.position = position
       this.tile = tile
       this.align = align
       this.selected = false
       this.shotSpeed = 1 
       this.loaded = false
       this.shotRadius = 0
       
       // this is here so buildings can be sorted out and handled sepratly 
       this.unitCheck = true 
       
    }
    lifeCheck(){
        if(this.health > 0) return true
        return false
    }
    recharge(){
        this.energy = this.maxEnergy
        this.attacked = false
    }
    attack(target){
        if(target.unitCheck){
            if(this.direction === "top" && (target.direction ==="top" || target.direction ==="right" ||target.direction ==="left")){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "right" && (target.direction !== 'left')){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "bottom" && (target.direction ==="up" || target.direction ==="right" ||target.direction ==="left")){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "left" && (target.direction ==="up" || target.direction ==="right" ||target.direction ==="down")){
                target.health -= this.attack
                console.log("right attack")
            }
            target.health -= this.attack
            console.log(target.health)
            if(!Unit.prototype.lifeCheck.call(target)){
                tileArray[target.tile].unit = null 
                aiUnitArray.splice(target.position, 1)}
                console.log("Rest in Peace")
            }
    
    else{
        target.health -= this.attack
        if(!Building.prototype.lifeCheck.call(target)){
            tileArray[target.tile].building = null 
        }
    }
    this.attacked = true
    }
}
