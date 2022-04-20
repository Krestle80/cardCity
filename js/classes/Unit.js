//base class for all units
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
       this.shooting = false
       this.particles = []
       this.shotParticlesInitiated = false
       this.shotRadius = canvas.height/150
       this.initialShotRadius = canvas.height/150
       this.shotShrunk = false
       // this is here so buildings can be sorted out and handled sepratly 
       this.unitBuildCheck = true 
       this.target
    }
    lifeCheck(){
        if(this.health > 0) return true
        return false
    }
    recharge(){
        this.energy = this.maxEnergy
        this.attacked = false
        this.loaded = true
        this.shotRadius = this.initialShotRadius
    }
    shoot(target){
        this.attacked = true
        this.loaded = false
        this.shooting = true
        this.target = target
    }
    attack(target){
        if(target.unitBuildCheck){
            if(this.direction === "top" && (target.direction !== 'bottom')){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "right" && (target.direction !== 'left')){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "bottom" && (target.direction !== 'top')){
                target.health -= this.attack
                console.log("right attack")
            }
            if(this.direction === "left" && (target.direction !== 'right')){
                target.health -= this.attack
                console.log("right attack")
            }
            target.health -= this.attack
            //checks to see if the attacked unit is still alive
            if(!Unit.prototype.lifeCheck.call(target)){
                tileArray[target.tile].unit = null 
                aiUnitArray.splice(target.position, 1)

                //loops through player and ai arrays and updates positions after removal
                for(let i = 0; i < playerUnitArray.length; i ++){
                    playerUnitArray[i].position = i
                }
                for(let i = 0; i < aiUnitArray.length; i ++){
                    aiUnitArray[i].position = i
                }
                console.log("Rest in Peace")
            }
        }
    
        else{
            target.health -= this.attack
            if(!(Building.prototype.lifeCheck.call(target))){
                tileArray[target.position].building = null
            }
        }
        console.log(target)
    }
}