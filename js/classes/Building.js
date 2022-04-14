//buildings
class Building {
    constructor(health, gpt, tpt, type, position, align){
        this.health = health
        this.gpt = gpt
        this.tpt = tpt
        this.type = type
        this.position = position 
        this.align = align
        this.unitBuildCheck = false
    }
    lifeCheck(){
        if(this.health > 0) return true
        return false
    }
    build(){
        if(this.align == "blue"){
            playerGpt += this.gpt
            playerTpt += this.tpt
            if(this.maniplePt){
                maniplePt += this.maniplePt
            }
        }
    }
}