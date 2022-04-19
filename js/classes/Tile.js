//class to store data for each tile on the grid
class Tile {
    constructor(x,y, position, align){
        this.x = x;
        this.y = y;
        this.width = canvas.width/10
        this.height = canvas.height/10
        this.building = null 
        this.unit = null
        this.highlighted = false
        //position in tile array
        this.position = position
        //whose tile is this
        this.align = align
    }
    update(){
        //insures its the players turn before alowing them to place or move units/ buildings
        if(playerTurn == true){
        //handles fort placement
            if(collison(this, mouse) && mouse.clicked == true && selectedCard === "fort" && this.align == "blue" && playerGold > 1 ){
                if(this.building) return
                this.building = new Fort("blue", this.position)
                hand.splice(handPosition, 1)
                selectedCard = null
                this.building.build()
            }

            //testing ai units
            if(collison(this, mouse) && mouse.clicked == true && selectedCard === "aiTest" && this.align == "blue"){
                this.unit = new Maniple(aiUnitArray.length, this.position, "red")
                aiUnitArray.push(this.unit)
            }
            //handles unclicking or moving the unit while unselecting all posible movement tiles 
            if(collison(this,mouse) && mouse.clicked == true && selectedUnit && selectedUnit.selected === true && (this.highlighted == true || (selectedUnit && this.position === selectedUnit.tile && selectedUnit.selected == true))){
                if(!checkClickFrame()) return
                mouse.timesClicked ++
                selectedUnit.selected = false
                //tiles two to the left of the unit
                if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile === 0)){
                    if(!(selectedUnit.tile.toString().split('')[1] === "1" || selectedUnit.tile === 1)){
                        tileArray[selectedUnit.tile-2].highlighted = false
                    }
                    tileArray[selectedUnit.tile-1].highlighted = false
                }
                //tiles two to the right of selected unit
                if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile+1].highlighted = false
                    if(!(selectedUnit.tile.toString().split('')[1] === "8" || selectedUnit.tile === 8)){
                        tileArray[selectedUnit.tile+2].highlighted = false
                    }
                }

                //top two as well as top right 
                if(!(selectedUnit.tile <= 9)){
                    if(!(selectedUnit.tile < 20)){
                        tileArray[selectedUnit.tile-20].highlighted = false
                    }
                    tileArray[selectedUnit.tile-10].highlighted = false
                    if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile-9].highlighted = false
                    }
                }
                //top left
                if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile == 0 || selectedUnit.tile <= 9)){
                    tileArray[selectedUnit.tile-11].highlighted = false
                }
                //bottom 
                if(!(selectedUnit.tile >= 50)){
                    //bottom two
                    tileArray[selectedUnit.tile+10].highlighted = false
                    if(!(selectedUnit.tile >= 40)){
                        tileArray[selectedUnit.tile+20].highlighted = false
                    }
                    //bottom right
                    if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile+11].highlighted = false
                }
                    //bottom left
                    if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile==0)){
                        tileArray[selectedUnit.tile+9].highlighted = false
                    }
                }

                // handles unit movement for two energy tiles
                if(!(this.unit) && !(this.building && this.building.align === "red")&&  ((this.position === selectedUnit.tile - 2 || this.position === selectedUnit.tile + 2 || this.position === selectedUnit.tile - 20 || this.position === selectedUnit.tile + 20 || this.position === selectedUnit.tile - 11 || this.position === selectedUnit.tile + 11 || this.position === selectedUnit.tile - 9 || this.position === selectedUnit.tile + 9) && selectedUnit.energy > 1)){
                    if(this.position === selectedUnit.tile + 20){
                        selectedUnit.direction = "bottom"
                    }
                    if(this.position === selectedUnit.tile - 20){
                        selectedUnit.direction = "top"
                    }
                    if(this.position === selectedUnit.tile + 2){
                        selectedUnit.direction = "right"
                    }
                    if(this.position === selectedUnit.tile - 2){
                        selectedUnit.direction = "left"
                    }
                    if(this.position === selectedUnit.tile + 11 || this.position === selectedUnit.tile - 9){
                        selectedUnit.direction = "right"
                    }
                    if(this.position === selectedUnit.tile + 9 || this.position === selectedUnit.tile - 11){
                        selectedUnit.direction = "left"
                    }
                tileArray[selectedUnit.tile].unit = null
                this.unit = selectedUnit
                this.unit.tile = this.position
                this.unit.energy -= 2
                }
                //handles unit movement for one energy tiles
                if(!(this.unit) && !(this.building && this.building.align === "red") && ((this.position === selectedUnit.tile - 1 || this.position === selectedUnit.tile + 1 || this.position === selectedUnit.tile - 10 || this.position === selectedUnit.tile + 10) && selectedUnit.energy > 0)){
                    if(this.position === selectedUnit.tile + 10){
                        selectedUnit.direction = "bottom"
                    }
                    if(this.position === selectedUnit.tile - 10){
                        selectedUnit.direction = "top"
                    }
                    if(this.position === selectedUnit.tile + 1){
                        selectedUnit.direction = "right"
                    }
                    if(this.position === selectedUnit.tile - 1){
                        selectedUnit.direction = "left"
                    }
                    
                    tileArray[selectedUnit.tile].unit = null
                    this.unit = selectedUnit
                    this.unit.tile = this.position
                    this.unit.energy -= 1
                }
                //attacking a unit
                if(this.unit && this.unit.align === "red" && selectedUnit.attacked == false){
                    if(this.position === selectedUnit.tile + 2){
                        selectedUnit.direction = "right"
                        selectedUnit.energy -= 1
                        console.log( selectedUnit, this.unit)
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile + 1].unit = selectedUnit
                        tileArray[selectedUnit.tile + 1].unit.tile = selectedUnit.tile + 1
                    }
                    else if(this.position === selectedUnit.tile - 2 ){
                        //changes unit inner states
                        selectedUnit.direction = "left"
                        selectedUnit.energy -= 1
                        console.log(this.unit, selectedUnit)
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                        //moves unit
                        console.log(tileArray[selectedUnit.tile - 1])
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile - 1].unit = selectedUnit
                        tileArray[selectedUnit.tile - 1].unit.tile = selectedUnit.tile - 1
                        
                    }
                    else if(this.position === selectedUnit.tile - 20 ){
                        //changes unit inner states
                        selectedUnit.direction = "top"
                        selectedUnit.energy -= 1
                        console.log(this.unit, selectedUnit)
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                        //moves unit
                        console.log(tileArray[selectedUnit.tile - 10])
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile - 10].unit = selectedUnit
                        tileArray[selectedUnit.tile - 10].unit.tile = selectedUnit.tile - 10
                        
                    }
                    else if(this.position === selectedUnit.tile + 20 ){
                        //changes unit inner states
                        selectedUnit.direction = "bottom"
                        selectedUnit.energy -= 1
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                        //moves unit
                        console.log(tileArray[selectedUnit.tile + 10])
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile + 10].unit = selectedUnit
                        tileArray[selectedUnit.tile + 10].unit.tile = selectedUnit.tile + 10
                        
                    }
                    else if(this.position === selectedUnit.tile + 1 ) {
                        selectedUnit.direction = "right"
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile - 1 ) {
                        selectedUnit.direction = "left"
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile + 10 ) {
                        selectedUnit.direction = "bottom"
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile - 10 ) {
                        selectedUnit.direction = "top"
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                    }
                    else {

                        console.log(this.unit, selectedUnit)
                        Unit.prototype.shoot.call(selectedUnit, this.unit)
                    }
                }
                // attacking a building
                else if(this.building && this.building.align === "red" && selectedUnit.attacked == false){
                    Unit.prototype.shoot.call(selectedUnit, this.building)
                }
            }
            //handles selecting a unit and then highlighting all tiles it can move to/ attack
            if(collison(this, mouse) && mouse.clicked == true && this.unit){
                if(!checkClickFrame()) return
                mouse.timesClicked ++
                if( this.unit.align === "red") return
                if(selectedUnit && selectedUnit.selected == true && selectedUnit === this.unit) return
                selectedUnit = this.unit
                selectedUnit.selected = true
                // logic for picking tiles
                // left x
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0 )&& ((selectedUnit.energy > 0 && !tileArray[this.position -1].unit) || (tileArray[this.position - 1].unit && tileArray[this.position - 1].unit.align === 'red' && selectedUnit.attacked == false))){
                    if(!(this.position.toString().split('')[1] === "1" || this.position === 1  ) && selectedUnit.energy > 1 && (!tileArray[this.position - 1].unit && (!tileArray[this.position - 2].unit || tileArray[this.position - 2].unit.align === "red")) ){
                        tileArray[this.position-2].highlighted = true
                    }
                    tileArray[this.position-1].highlighted = true
                }

                // right x
                if(!(this.position.toString().split('')[1] === "9"|| this.position == 9) && ((!(tileArray[this.position + 1].unit) &&  selectedUnit.energy > 0) || (tileArray[this.position +1].unit && tileArray[this.position + 1].unit.align === 'red' && selectedUnit.attacked == false))){
                        tileArray[this.position+1].highlighted = true
                        if(!(this.position.toString().split('')[1] === "8"|| this.position == 8) && ((selectedUnit.energy > 1 && !tileArray[this.position + 1].unit) || (tileArray[this.position + 2].unit && tileArray[this.position + 2].unit.align === "red"))){
                            tileArray[this.position+2].highlighted = true
                        }
                }
                // for top 
                if(!(this.position <= 9) && ((selectedUnit.energy > 0 && !tileArray[this.position - 10].unit) || (tileArray[this.position - 10].unit && tileArray[this.position - 10].unit.align === 'red' && selectedUnit.attacked == false))){
                    tileArray[this.position-10].highlighted = true
                    if((!(this.position < 20) && selectedUnit.energy > 1 && !tileArray[this.position - 20].unit) || ( this.energy > 0 && tileArray[this.position - 20].unit && tileArray[this.position - 20].unit.align === "red")){
                        tileArray[this.position-20].highlighted = true
                    }
                }
                // top right corner
                if(!(this.position.toString().split('')[1] === "9"|| this.position <= 9) && selectedUnit.energy > 1 && (!tileArray[this.position - 9].unit) && !(tileArray[this.position + 1 ].unit && tileArray[this.position - 10].unit)){
                tileArray[this.position-9].highlighted = true
                }
                // top left corner
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0 || this.position <= 9) && selectedUnit.energy > 1 && !tileArray[this.position - 11].unit && !(tileArray[this.position - 1].unit && tileArray[this.position - 10].unit)){
                    tileArray[this.position-11].highlighted = true
                }
                // bottom y
                if(!(this.position >= 50) && ((selectedUnit.energy > 0 && !(tileArray[this.position + 10].unit)) || (tileArray[this.position + 10].unit && tileArray[this.position + 10].unit.align === "red" && selectedUnit.attacked == false))){
                    tileArray[this.position+10].highlighted = true
                    if((!(this.position >= 40) && selectedUnit.energy > 1 && !tileArray[this.position + 10].unit)){
                        tileArray[this.position+20].highlighted = true
                    }
                }
                //bottom right corner
                if(!(this.position.toString().split('')[0] === "5" || this.position.toString().split('')[1] === "9" || this.position == 9) && selectedUnit.energy > 1 && !tileArray[this.position + 11].unit && !(tileArray[this.position + 1].unit && tileArray[this.position + 10].unit)){
                tileArray[this.position+11].highlighted = true
                }
                //bottom left corner
                if(!(this.position.toString().split('')[0] === "5" || this.position.toString().split('')[1] === "0" || this.position==0)  && selectedUnit.energy > 1 && !tileArray[this.position + 9].unit && !(tileArray[this.position - 1].unit && tileArray[this.position + 10].unit)){
                    tileArray[this.position + 9].highlighted = true
                }
            }
            //handles placing a maniple
            if(collison(this, mouse) && mouse.clicked == true && selectedCard === "maniple" && this.align == "blue" && playerGold > 0 ){
                if(this.building || this.unit) return
                let unitPosition = playerUnitArray.length
                this.unit = new Maniple(unitPosition, this.position, "blue")
                playerUnitArray.push(this.unit)
                hand.splice(handPosition, 1)
                selectedCard = null
                playerGold -= 1
            }    
        }
    }
    draw(){
        ctx.lineWidth = 5

        
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1
        if(this.align === "blue"){ctx.fillStyle = "#5b99f0"}
        if(this.align === "red"){ctx.fillStyle = "#f76d6d"}
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x,this.y,this.width,this.height)
        ctx.fillStyle = '#6789b9'
        if(this.building){
            this.building.draw(this.x, this.y)
        }   
        
        if(this.unit){
            // ctx.beginPath()
            // ctx.moveTo(this.x + this.width/2, this.y)
            // ctx.lineTo(this.x + this.width/2, this.y + this.height)
            // ctx.stroke()
            // ctx.moveTo(this.x, this.y + this.height/2)
            // ctx.lineTo(this.x + this.width, this.y + this.height/2)
            // ctx.stroke()
            // ctx.closePath()
            // this.unit.draw(this.x, this.y)
        }

    }
    select(){
        if(collison(this, mouse) || this.highlighted == true){
            if(this.unit && this.unit.align == "red" || this.building && this.building.align == "red"){
                ctx.strokeStyle = "#940404"
            }
            else {ctx.strokeStyle = "yellow"}
            ctx.lineWidth = 5
            ctx.strokeRect(this.x + 3,this.y + 3 ,this.width - 6,this.height - 6)
            ctx.strokeStyle = '#2762b5'
        }
    }
}