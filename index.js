let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var canvasPosition = canvas.getBoundingClientRect();


//variabeles for setting framerate
let fps = 30;
let framMinTime = (1000/60)*(60/fps)- (1000/60)*0.5
let lastFrameTime = 0

var turnCounter = 0

let hand = []
let selectedCard = null
let handPosition = null
let playerGold = 1
let playerGpt = 1
let playerTech = 0
let playerTpt = 1
let maniplePt = -1
let playerTurn = true

let aiGold = 1
let aiGpt = 1
let aiTech = 0
let aiTpt = 1
let aiManiplePt = -1

let nextTurnHitBox = {
    x: canvas.width/1.1,
    y: canvas.height/100,
    width:100,
    height: 40
}
//global object to hold data on a selected unit
let selectedUnit = ""


let positionRandomizer = (minX, maxX) =>{
    let x = Math.floor((Math.random()*(maxX-minX)) + minX )
    let y = (Math.floor(Math.random()*(6)))*10
    return x + y
    
}
let sample = new Image( canvas.width/10, canvas.height/3.4);
sample.src = 'trialCard.png'

let manipleCard = new Image()
manipleCard.src = 'maniple.png'

let topDisplayGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/15, canvas.width/2, 0)
topDisplayGradient.addColorStop(0.05, "#4d6a93")
topDisplayGradient.addColorStop(0.12, "#bccde6")
topDisplayGradient.addColorStop(0.5, "#84a8db")

let bottomDisplayGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/1.5, canvas.width/2, canvas.height)
bottomDisplayGradient.addColorStop(0.02, "#4d6a93")
bottomDisplayGradient.addColorStop(0.08, "#bccde6")
bottomDisplayGradient.addColorStop(0.3, "#84a8db")

drawDisplay = () => {
    //bars for top and bottom
    ctx.fillStyle = topDisplayGradient
    ctx.fillRect(0,0, canvas.width, canvas.height/15)
    
    ctx.fillStyle = "red"
    ctx.fillRect(canvas.width/1.1, canvas.height/100, 100,40)
    ctx.fillStyle = "black"
    ctx.font = "30px Arial"
    ctx.fillText(playerGold, canvas.width/30, canvas.height/21)
    ctx.fillText("(" + playerGpt + ")+", canvas.width/20, canvas.height/21)
    ctx.fillText(playerTech, canvas.width/11, canvas.height/21)
    ctx.fillText("(" + playerTpt + ")+", canvas.width/9.3, canvas.height/21)


    ctx.fillStyle = bottomDisplayGradient
    ctx.fillRect(0, canvas.height/1.5, canvas.width, canvas.height/2)
}

const mouse = {
    x:0,
    y:0,
    width:0.1,
    height:0.1,
    clicked: false,
    timesClicked: 0,
    lastClickFuntion: 0, 
};


let checkClickFrame = () => {
    if(mouse.timesClicked === mouse.lastClickFuntion) return true
}

canvas.addEventListener('mousedown', (e) =>{
    mouse.clicked = true
})

canvas.addEventListener('mouseup', (e) =>{
    mouse.clicked = false
})

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})
// arrays to hold a bunch of objects
let tileArray = []
let playerUnitArray = []
let aiUnitArray = []



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
                playerGpt +=1
                maniplePt += 1
                playerGold -=2
            }

            //testing ai units
            if(collison(this, mouse) && mouse.clicked == true && selectedCard === "aiTest" && this.align == "blue"){
                this.unit = new Maniple(aiUnitArray.length, this.position, "red")
                aiUnitArray.push(this.unit)
            }
            //handles unclicking or moving the unit while unselecting all posible movement tiles 
            if(collison(this,mouse) && mouse.clicked == true && selectedUnit.selected === true && (this.highlighted == true || (selectedUnit && this.position === selectedUnit.tile && selectedUnit.selected == true))){
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
                tileArray[selectedUnit.tile].unit = null
                this.unit = selectedUnit
                this.unit.tile = this.position
                this.unit.energy -= 2
                }
                //handles unit movement for one energy tiles
                if(!(this.unit) && !(this.building && this.building.align === "red") && ((this.position === selectedUnit.tile - 1 || this.position === selectedUnit.tile + 1 || this.position === selectedUnit.tile - 10 || this.position === selectedUnit.tile + 10) && selectedUnit.energy > 0)){
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
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile + 1].unit = selectedUnit
                        tileArray[selectedUnit.tile + 1].unit.tile = selectedUnit.tile + 1
                    }
                    else if(this.position === selectedUnit.tile - 2 ){
                        //changes unit inner states
                        selectedUnit.direction = "left"
                        selectedUnit.energy -= 1
                        console.log(this.unit, selectedUnit)
                        Unit.prototype.attack.call(selectedUnit, this.unit)
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
                        Unit.prototype.attack.call(selectedUnit, this.unit)
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
                        console.log(this.unit, selectedUnit)
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                        //moves unit
                        console.log(tileArray[selectedUnit.tile + 10])
                        tileArray[selectedUnit.tile].unit = null
                        tileArray[selectedUnit.tile + 10].unit = selectedUnit
                        tileArray[selectedUnit.tile + 10].unit.tile = selectedUnit.tile + 10
                        
                    }
                    else if(this.position === selectedUnit.tile + 1 ) {
                        selectedUnit.direction = "right"
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile - 1 ) {
                        selectedUnit.direction = "left"
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile + 10 ) {
                        selectedUnit.direction = "bottom"
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                    }
                    else if(this.position === selectedUnit.tile - 10 ) {
                        selectedUnit.direction = "top"
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                    }
                    else {

                        console.log(this.unit, selectedUnit)
                        Unit.prototype.attack.call(selectedUnit, this.unit)
                    }
                }
                // attacking a building
                else if(this.building && this.building.align === "red" && selectedUnit.attacked == false){
                    Unit.prototype.attack.call(selectedUnit, this.building)
                }
            }
            //handles selecting a unit and then highlighting all tiles it can move to/ attack
            if(collison(this, mouse) && mouse.clicked == true && this.unit){
                if(!checkClickFrame()) return
                mouse.timesClicked ++
                if( this.unit.align == "red") return
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
                    if(!((this.position >= 40) && selectedUnit.energy > 1 && !tileArray[this.position + 10].unit)){
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
                console.log(playerUnitArray.length)
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
        if(this.align === "red"){ctx.fillStyle = "#826767"}
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x,this.y,this.width,this.height)
        ctx.fillStyle = '#6789b9'
        if(this.building){
            if(this.building.type === "fort"){
                ctx.fillStyle = "blue"
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.fillStyle = '#6789b9'
            }
            if(this.building.type === "settlement"){
                if(this.building.align == "blue"){
                ctx.fillStyle = "orange"
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.fillStyle = '#6789b9'}
                else {
                    ctx.fillStyle = "black"
                    ctx.fillRect(this.x, this.y, this.width, this.height)
                    ctx.fillStyle = '#6789b9'}
            }
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
            this.unit.draw(this.x, this.y)
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

let gridMaker = () =>{
    let position = 0
    for(let y = canvas.height/15; y < canvas.height/1.6; y += canvas.height/10){
        for(let x =0; x < canvas.width; x += canvas.width/10){
            let align = ""
            if (position < 5 || parseInt(position.toString().split('')[1]) < 5){
                align = "blue"
            }
            else align = "red"
            tileArray.push(new Tile(x,y, position, align))
            position ++
        }
    }
}
gridMaker()



drawTiles = () =>{
    for(let i = 0; i < tileArray.length; i ++){
        tileArray[i].draw()
        tileArray[i].update()
        
    }
    for(let i = 0; i < tileArray.length; i ++){
        tileArray[i].select()
    }
}

let collison = (first, second) =>{
    if(!(first.x > second.x + second.width || 
        first.x + first.width < second.x || 
        first.y > second.y + second.height ||
        first.y + first.height < second.y)) {
            return true;
    };
};
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
       this.shotRadius = canvas.height/150
       this.initialShotRadius = canvas.height/150
       
       // this is here so buildings can be sorted out and handled sepratly 
       this.unitBuildCheck = true 
       
    }
    lifeCheck(){
        if(this.health > 0) return true
        return false
    }
    recharge(){
        this.energy = this.maxEnergy
        this.attacked = false
        this.loaded = true
    }
    attack(target){
        console.log(target)
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
            console.log(target.health)
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
            }
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

// drawing functions for unit subclasses

let drawUnitX = (angle, unitColor, x, y, unit) => {
            //base arrow
            ctx.strokeStyle = unitColor
            ctx.lineWidth = 10 
            ctx.beginPath()
            ctx.save()

            ctx.translate( x + canvas.width/20, y + canvas.height/45)
            ctx.rotate(angle)
            ctx.moveTo( 0 , 0 )
            ctx.lineTo(  0,   canvas.height/25)
            ctx.translate(0, canvas.height/25)
            ctx.rotate(angle*(-2))
            ctx.lineTo(0, canvas.height/25)
            ctx.restore()
            ctx.stroke()
            ctx.closePath()

            //path for energy bars
            if(unit.energy > 0){
                ctx.strokeStyle = unitColor
                
                ctx.beginPath()
                ctx.save()
                ctx.translate( x + canvas.width/20, y + canvas.height/45)
                ctx.rotate(angle)
                ctx.moveTo( 0 , 0 )
                ctx.lineTo(  0,   canvas.height/25)
                ctx.translate(0, canvas.height/25)
                ctx.stroke()
                ctx.closePath()
                ctx.rotate(angle*(-2))
                ctx.beginPath()
                ctx.strokeStyle= "#c49a45"
                ctx.lineTo(0, canvas.height/220)
                ctx.lineTo(0, canvas.height/60)
                ctx.stroke()
                ctx.closePath()
            
            if(unit.energy > 1 ){
                ctx.beginPath()
                ctx.moveTo( 0,  canvas.height/29)
                ctx.lineTo( 0 , canvas.height/45)
                ctx.stroke()
                ctx.closePath()
            }
            ctx.restore()

            }


            //path for health bars

            ctx.strokeStyle= "#940404"
            ctx.beginPath()
            ctx.save()
            ctx.translate( x + canvas.width/20, y + canvas.height/45)
            ctx.rotate(angle)
            ctx.moveTo( 0, + canvas.height/29)
            ctx.lineTo( 0 , canvas.height/45 )
            ctx.restore()
            ctx.stroke()
            ctx.closePath()
            if(unit.health == 2 ){
                //second health bar
                ctx.strokeStyle= "#940404"
                ctx.beginPath()
                ctx.save()
                ctx.translate( x + canvas.width/20, y + canvas.height/45)
                ctx.rotate(angle)
                ctx.moveTo( 0, + canvas.height/220)
                ctx.lineTo( 0 , canvas.height/60 )
                ctx.restore()
                ctx.stroke()
                ctx.closePath()
            }

            //circle for shot
            if(unit.loaded == true){
                
                ctx.beginPath()
                ctx.save()
                
                ctx.fillStyle = "red"
                ctx.translate( x + (canvas.width/20), y + canvas.height/20)
                ctx.rotate(angle*2)
                var shotGradient = ctx.createRadialGradient( 0, canvas.width/50,unit.shotRadius/5, 0, canvas.width/50,unit.shotRadius);
                
                shotGradient.addColorStop(.0, '#940404');
                shotGradient.addColorStop(.4, '#c49a45');
                shotGradient.addColorStop(.9, 'white');
                shotGradient.addColorStop(1, 'black');
                ctx.fillStyle = shotGradient
                ctx.arc(0, canvas.width/50, unit.shotRadius, 0, 2*Math.PI)
                ctx.fill()
                ctx.restore()
                ctx.closePath()


            }
}
let drawUnitY = (angle, unitColor, x, y, unit) => {
    //base arrow
    ctx.strokeStyle = unitColor
    ctx.lineWidth = 10 
    ctx.beginPath()
    ctx.save()
    ctx.translate( x + canvas.width/30, y + canvas.height/20)
    ctx.rotate(angle)
    ctx.moveTo(0 , 0)
    ctx.lineTo(canvas.height/25, 0  )
    ctx.translate(canvas.height/25, 0 )
    ctx.rotate(angle*(-2))
    ctx.lineTo(canvas.height/25, 0)
    ctx.restore()
    ctx.stroke()
    ctx.closePath()

    //path for energy bars
    if(unit.energy > 0){
        ctx.strokeStyle = unitColor
        
        ctx.beginPath()
        ctx.save()
        ctx.translate( x + canvas.width/30, y + canvas.height/20)
        ctx.rotate(angle)
        ctx.moveTo( 0 , 0 )
        ctx.lineTo(canvas.height/25, 0)
        ctx.translate(canvas.height/25, 0)
        ctx.stroke()
        ctx.closePath()
        ctx.rotate(angle*(-2))
        ctx.beginPath()
        ctx.strokeStyle= "#c49a45"
        ctx.lineTo(canvas.height/220, 0)
        ctx.lineTo(canvas.height/60, 0 )
        ctx.stroke()
        ctx.closePath()
    
        if(unit.energy > 1 ){
            ctx.beginPath()
            ctx.moveTo(canvas.height/29, 0)
            ctx.lineTo( canvas.height/45, 0)
            ctx.stroke()
            ctx.closePath()
        }
        ctx.restore()
    }


    //path for health bars

    ctx.strokeStyle= "#940404"
    ctx.beginPath()
    ctx.save()
    ctx.translate( x + canvas.width/30, y + canvas.height/20)
    ctx.rotate(angle)
    ctx.moveTo( canvas.height/29, 0)
    ctx.lineTo( canvas.height/45, 0)
    ctx.restore()
    ctx.stroke()
    ctx.closePath()
    if(unit.health == 2 ){
        //second health bar
        ctx.strokeStyle= "#940404"
        ctx.beginPath()
        ctx.save()
        ctx.translate( x + canvas.width/30, y + canvas.height/20)
        ctx.rotate(angle)
        ctx.moveTo( canvas.height/220, 0 )
        ctx.lineTo( canvas.height/60 , 0 )
        ctx.restore()
        ctx.stroke()
        ctx.closePath()
    }
    if(unit.loaded == true){
                
        ctx.beginPath()
        ctx.save()
        
        ctx.fillStyle = "red"
        ctx.translate( x + canvas.width/30, y + canvas.height/20)
        ctx.rotate(angle*2)
        var shotGradient = ctx.createRadialGradient( 0, canvas.width/50,unit.shotRadius/5, 0, canvas.width/50,unit.shotRadius);
        
        shotGradient.addColorStop(.0, '#940404');
        shotGradient.addColorStop(.3, '#c49a45');
        if(unit.align === "red")shotGradient.addColorStop(1, 'white');
        else shotGradient.addColorStop(1, 'white');
        ctx.fillStyle = shotGradient
        ctx.arc(0, canvas.width/50, unit.shotRadius, 0, 2*Math.PI)
        ctx.fill()
        ctx.restore()
        ctx.closePath()
    }
}
//unit subclasses 
class Maniple extends Unit {
    constructor(position, tile, align){
        super(2, 1, 1, 2,  "maniple", position, tile, align) 
    }
    draw( x, y ){
        let unitColor = ''
        let angle = -(Math.PI/4)
        if(this.align === "blue"){unitColor = "white"}
        else {unitColor = "black"
            }
        if (this.direction == "right"){
            drawUnitX(-(Math.PI/4), unitColor, x, y, this)
        }
        if (this.direction == "left"){
            drawUnitX((Math.PI/4), unitColor, x, y, this)
        }
        if (this.direction == "top"){
            drawUnitY((-Math.PI/4), unitColor, x, y, this)
        }
        if (this.direction == "bottom"){
            drawUnitY(Math.PI/4, unitColor, x, y, this)
        }
    }
    
    attack(target){
        return super.attack(target)
    }
    animateShot(){
        
    }
}

//buildings
class Building {
    constructor(health, gpt, tpt, type, position, align){
        this.healt = health
        this.gpt = gpt
        this.tpt = tpt
        this.type = type
        this.position = position 
        this.align = align
        this.unitBuildCheck = "building" 
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

class Settlement extends Building{
    constructor(position, align){
        super(4, 1, 1, "settlement", position, align)
    }
}
class Fort extends Building{
    constructor(position, align){
        super(2, 1, 0, "fort", position, align)
        this.maniplePt = 1
    }
}
//cards

class Card {
    constructor(type){
        this.x = 0
        this.y = canvas.height/1.45
        this.startY = canvas.height/1.45
        this.width = canvas.width/10
        this.height = canvas.height/3.4
        this.type = type
        this.selected = false
    }
    update(){
                if(collison(this, mouse) && mouse.clicked === true){
                    if(this.selected == true){
                        selectedCard = null
                        this.selected = false
                    }
                    else if (this.selected == false){
                        selectedCard = this.type
                        this.selected = true
                    }
                }

            }
    draw(x){
        this.x = x
        if(collison(this, mouse) || this.selected == true){
            ctx.strokeStyle = 'yellow'
            if(this.y > canvas.height/1.55 ){
                this.y -= 5
            }
        }
        else{
            ctx.strokeStyle = '#2762b5'  
            if (this.y < canvas.height/1.45)this.y +=5
        }

        ctx.beginPath()
        ctx.rect(x, this.y, this.width, this.height) 
        ctx.closePath()   
        ctx.lineWidth = 10
        
        ctx.fillStyle = '#6789b9'
        ctx.stroke()
        ctx.fill()
        if (this.type === "fort") ctx.drawImage(sample, x - canvas.width/250, this.y - canvas.height/120)
        if (this.type === "maniple"){
            ctx.drawImage(manipleCard, x - canvas.width/250, this.y - canvas.height/120)
        }
        ctx.fillStyle = 'white'
        ctx.strokeStyle = '#2762b5'
    }
}


let handHandler = () => {
    let firstGap = 0
    for(i = 0; i < hand.length; i ++){
        if (i === 0){
            firstGap=10
        }
        hand[i].draw((firstGap) + (i*canvas.width/9))
        hand[i].update()
        if(hand[i].selected == true){
            handPosition = i
        }
    } 

}

//handles the player ending their turn 
let turnHandler = () =>{
    if(collison(nextTurnHitBox, mouse) && mouse.clicked == true && playerTurn == true)
    {
        //adds ai recouces
        aiGold += aiGpt
        aiTech += aiTpt
        if (maniplePt >= 0 ){
            for(let i = 0; i <= maniplePt ; i ++)
            hand.push(new Card("maniple"))
        } 
        console.log(selectedUnit)
        playerTurn = false
        turnCounter +=1
        aiHandler()
    }
}

let aiHandler = () =>{
    if(turnCounter > 1){
        aiUnitArray.forEach(unit =>{
            unit.recharge()
        })
    }
    //spawns forts 
    if (aiGold > 3 && turnCounter < 25){
        let fortRandomizer = () =>{
            let fortPosition = ""
            if(turnCounter < 14){
                fortPosition = positionRandomizer(7, 9)
            }
            else fortPosition = positionRandomizer(5, 7)
            if(tileArray[fortPosition].building){

                return fortRandomizer()
            }
            return fortPosition
        }
        if(turnCounter < 25) {
            let fortPosition = fortRandomizer()
            tileArray[fortPosition].building = new Fort(fortRandomizer(), 'red')
            aiGold -= 1 
            aiGpt +=1
        }

        // spawns units if ai can afford it , and already placed a fort first
        // if(aiGold > 0){
        //     let unitRandomizer = () => {
        //         let unitPosition = positionRandomizer(5,7)
        //         if(tileArray[unitPosition].unit) unitRandomizer()
        //         else {return unitPosition}
        //     }
        //     let unitPosition = unitRandomizer()
        //     tileArray[unitPosition].unit = new Maniple( aiUnitArray.length, unitPosition, 'red')
        //     aiUnitArray.push(tileArray[unitPosition].unit)
        // }
    }
    aiUnitArray.forEach(e => {
        //check for units within three tiles and save them into an array
        let checkArray = checkUnitsThree(e)
        console.log(checkArray)

            if(!(checkArray[0] === 0) && e.attacked === false){
                if(checkArray[0].align === "blue"){
                    if((checkArray[9] === 9  && checkArray[0].direction === "right" && checkArray[0].health === 2 && !e.tile <= 9 && e.energy > 1 )){
                        aiUnitMoveAndAttack(e, -11, "bottom", 2, checkArray[0])
                    }
                    else if(checkArray[18] === 18 && checkArray[0].direction === "right" && checkArray[0].health === 2 && !(e.tile >= 49) && e.energy > 1 && checkArray[0].direction === "right"  && e.energy > 1){
                        aiUnitMoveAndAttack(e, 9, "top", 2, checkArray[0])
                    }
                    else Unit.prototype.attack.call(e, checkArray[0])
                }
            }
            if(!(checkArray[3] === 3 ) && e.attacked === false){
                if(checkArray[3].align === "blue"){
                    if((checkArray[7] === 7  && checkArray[3].direction === "left" && checkArray[3].health === 2 && !(e.tile <= 9) && e.energy > 1)){
                        aiUnitMoveAndAttack(e, -9, "bottom", 2, checkArray[3])
                    }
                    else if(checkArray[16] === 16 && checkArray[3].direction === "left" && checkArray[3].health === 2 && !(e.tile >= 49) && e.energy > 1){
                        aiUnitMoveAndAttack(e, 11, "top", 2, checkArray[3])
                    }
                    else {
                        e.direction = "right"
                        Unit.prototype.attack.call(e, checkArray[3])
                    }
                }
            }
            if(!(checkArray[6] === 6)){
                if(checkArray[6].align === "blue"){
                    if((checkArray[7] === 7  && checkArray[6].direction === "bottom" && checkArray[6].health === 2 && !parseInt(e.tile.toString().split('')[1]) === 9) && !e.tile === 9 && e.energy > 1){
                        aiUnitMoveAndAttack(e, -9, "left", 2, checkArray[6])
                    }
                    else if(checkArray[9] === 9 && checkArray[6].direction === "bottom" && checkArray[6].health === 2 && !(e.tile === 0) && !parseInt(e.tile.toString().split('')[1]) === 0 && e.energy > 1){
                        aiUnitMoveAndAttack(e, -11, "right", 2, checkArray[6])
                    }
                    else Unit.prototype.attack.call(e, checkArray[6])
                }
            }
            if(!(checkArray[15] === 15)){
                if(checkArray[15].align === "blue"){
                    if((checkArray[16] === 16  && checkArray[15].direction === "top" && checkArray[15].health === 2 && !parseInt(e.tile.toString().split('')[1]) === 9) && !e.tile === 9 && e.energy > 1){
                        aiUnitMoveAndAttack(e, 11, "left", 2, checkArray[15])
                    }
                    else if(checkArray[9] === 9 && checkArray[15].direction === "top" && checkArray[15].health === 2 && !(e.tile === 0) && !parseInt(e.tile.toString().split('')[1]) === 0 && e.energy > 1){
                        aiUnitMoveAndAttack(e, 9, "right", 2, checkArray[15])
                    }
                    else Unit.prototype.attack.call(e, checkArray[15])
                }
            }
            if(!(checkArray[9] === 9) && e.energy > 0){
                if(checkArray[9].align === "blue"){
                    if(checkArray[9].direction !== "right" && checkArray[6] === 6){
                        aiUnitMoveAndAttack(e, -10, "left", 1, checkArray[9])
                    }
                    else if(checkArray[0] === 0 ){
                        aiUnitMoveAndAttack(e, -1, "top", 1, checkArray[9])
                    }
    
                }
            }
            if(!(checkArray[18] === 18) && e.energy > 0){
                if(checkArray[18].align === "blue"){
                    if(checkArray[18].direction !== "right" && checkArray[15] === 15){
                        aiUnitMoveAndAttack(e, 10, "left", 1, checkArray[18])
                    }
                    else if(checkArray[0] === 0 ){
                        aiUnitMoveAndAttack(e, -1, "bottom", 1, checkArray[18])
                    }

                }

            }
            if(!(checkArray[7] === 7) && e.energy > 0){
                if(checkArray[7].align === "blue"){
                    if(checkArray[7].direction !== "left" && checkArray[6] === 6){
                        aiUnitMoveAndAttack(e, -10, "right", 1, checkArray[7])
                    }
                    else if(checkArray[3] === 3 ){
                        aiUnitMoveAndAttack(e, 1, "top", 1, checkArray[7])
                    }

                }

            }
            if(!(checkArray[16] === 16) && e.energy > 0){
                if(checkArray[16].align === "blue"){
                    if(checkArray[16].direction !== "left" && checkArray[15] === 15){
                        aiUnitMoveAndAttack(e, 10, "right", 1, checkArray[16])
                    }
                    else if(checkArray[3] === 3 ){
                        aiUnitMoveAndAttack(e, 1, "bottom", 1, checkArray[16])
                    }

                }

            }
            if(!(checkArray[1] === 1) && e.energy > 0){
                if(checkArray[1].align === "blue" && checkArray[0] === 0){
                    aiUnitMoveAndAttack(e,-1,"left", 1, checkArray[1])
                }
            }
            if(!(checkArray[4] === 4) && e.energy > 0){
                if(checkArray[4].align === "blue" && checkArray[3] === 3){
                    aiUnitMoveAndAttack(e,1,"right", 1, checkArray[4])
                }
            }
            if(!(checkArray[11] === 11) && e.energy > 0){
                if(checkArray[11].align === "blue" && checkArray[6] === 6){
                    aiUnitMoveAndAttack(e,-10,"top", 1, checkArray[11])
                }
            }
            if(!(checkArray[20] === 20) && e.energy > 0){
                if(checkArray[20].align === "blue" && checkArray[15] === 15){
                    aiUnitMoveAndAttack(e,10,"bottom", 1, checkArray[20])
                }
            }
            if(!(checkArray[2] === 2) && e.energy > 1){
                if(checkArray[2].align === "blue" && checkArray[1] === 1){
                    aiUnitMoveAndAttack(e,-2,"left", 2, checkArray[2])
                }
            }
            if(!(checkArray[10] === 10) && e.energy > 1){
                if(checkArray[10].align === "blue" ){
                    if(checkArray[10].direction === "right" && checkArray[1] === 1){
                        aiUnitMoveAndAttack(e,-2,"top", 2, checkArray[10])
                    }
                    else if(checkArray[9] === 9) aiUnitMoveAndAttack(e,-11,"left", 2, checkArray[10])

                }
            }
            if(!(checkArray[13] === 13) && e.energy > 1){
                if(checkArray[13].align === "blue"){
                    if(checkArray[13].direction === "right" && checkArray[9] === 9){
                        aiUnitMoveAndAttack(e,-11,"top", 2, checkArray[13])
                    }
                    else if(checkArray[11] === 11){ aiUnitMoveAndAttack(e,-20,"left", 2, checkArray[13])}
                }
            }
            if(!(checkArray[14] === 14) && e.energy > 1){
                if(checkArray[14].align === "blue" && checkArray[11] === 11){
                    aiUnitMoveAndAttack(e,-20,"top", 2, checkArray[14])
                }
            }
            if(!(checkArray[19] === 19) && e.energy > 1){
                if(checkArray[19].align === "blue" ){
                    if(checkArray[19].direction === "right" && checkArray[1] === 1){
                        aiUnitMoveAndAttack(e,-2,"bottom", 2, checkArray[19])
                    }
                    else if(checkArray[18] === 18) aiUnitMoveAndAttack(e, 9,"left", 2, checkArray[19])

                }
            }
            if(!(checkArray[22] === 22) && e.energy > 1){
                if(checkArray[22].align === "blue"){
                    if(checkArray[22].direction === "right" && checkArray[18] === 18){
                        aiUnitMoveAndAttack(e, 9,"bottom", 2, checkArray[22])
                    }
                    else if(checkArray[20] === 20){ aiUnitMoveAndAttack(e,20,"left", 2, checkArray[22])}
                }
            }
            if(!(checkArray[23] === 23) && e.energy > 1){
                if(checkArray[23].align === "blue" && checkArray[20] === 20){
                    aiUnitMoveAndAttack(e,20,"bottom", 2, checkArray[23])
                }
            }
            if(!(checkArray[21] === 21) && e.energy > 1){
                if(checkArray[21].align === "blue" ){
                    if(checkArray[21].direction === "top" && checkArray[20] === 20){
                        aiUnitMoveAndAttack(e,20,"right", 2, checkArray[21])
                    }
                    else if(checkArray[16] === 16) aiUnitMoveAndAttack(e, 9,"bottom", 2, checkArray[21])

                }
            }
            if(!(checkArray[17] === 17) && e.energy > 1){
                if(checkArray[17].align === "blue"){
                    if(checkArray[17].direction === "top" && checkArray[16] === 16){
                        aiUnitMoveAndAttack(e, 11,"right", 2, checkArray[17])
                    }
                    else if(checkArray[4] === 4){ aiUnitMoveAndAttack(e,2,"bottom", 2, checkArray[17])}
                }
            }
            if(!(checkArray[5] === 5)&& e.energy > 1){
                if(checkArray[5].align === "blue" && checkArray[4] === 4){
                    aiUnitMoveAndAttack(e,2,"right", 2, checkArray[5])
                }
            }
            
            if(!(checkArray[8] === 8) && e.energy > 1){
                if(checkArray[8].align === "blue" ){
                    if(checkArray[8].direction === "bottom" && checkArray[7] === 7){
                        aiUnitMoveAndAttack(e,-9,"right", 2, checkArray[8])
                    }
                    else if(checkArray[4] === 4) aiUnitMoveAndAttack(e, 2,"top", 2, checkArray[8])

                }
            }
            if(!(checkArray[12] === 12) && e.energy > 1){
                if(checkArray[12].align === "blue"){
                    if(checkArray[12].direction === "bottom" && checkArray[11] === 11){
                        aiUnitMoveAndAttack(e, -20 ,"right", 2, checkArray[12])
                    }
                    else if(checkArray[7] === 7){ aiUnitMoveAndAttack(e, -9,"top", 2, checkArray[12])}
                }
            }

            if(e.tile > 2 && (parseInt(e.tile.toString().split('')[1])) > 2 && !(tileArray[e.tile-2].unit) && e.energy === 2 && e.attacked == false){
                tileArray[e.tile].unit = null
                tileArray[e.tile-2].unit = aiUnitArray[e.position]
                aiUnitArray[e.position].tile -= 2
            }
        }
    )

    
    playerTurnChangeOver()
}

let aiUnitMoveAndAttack = (unit, differenceOfTile, direction, energyCost, target ) =>{
    tileArray[unit.tile].unit = null
    tileArray[unit.tile + differenceOfTile].unit = aiUnitArray[unit.position]
    aiUnitArray[unit.position].tile += differenceOfTile
    unit.energy -= energyCost 
    unit.direction = direction
    if(unit.attacked === false){
        Unit.prototype.attack.call(unit, target)
    }
}

let checkUnitsThree = (unit) => {
    //sets an array to stuff the nearby units into 
    let checkArray = []
    console.log(checkArray)
    //checks in left X
    if(!(unit.tile === 0 || unit.tile.toString().split('')[1] === 0)){
        if((tileArray[unit.tile - 1].unit)){
            checkArray.push(tileArray[unit.tile - 1].unit)
        }
        else checkArray.push(0)
        if(!(parseInt(unit.tile.toString().split('')[1]) <= 1)){
            if((tileArray[unit.tile - 2].unit)){
                checkArray.push(tileArray[unit.tile - 2].unit)
            }
            else checkArray.push(1)
            if(!(parseInt(unit.tile.toString().split('')[1]) <= 2) && tileArray[unit.tile - 3].unit){
                    checkArray.push(tileArray[unit.tile - 3].unit)
                }
            else checkArray.push(2)
        }
        else{
            checkArray.push(1)
            checkArray.push(2)
        }
    }
    else {
        checkArray.push(0)
        checkArray.push(1)
        checkArray.push(2)
    }
    //checks in right x
    if(!(unit.tile === 9 || unit.tile.toString().split('')[1] === 9)){
        if((tileArray[unit.tile + 1].unit)){
            checkArray.push(tileArray[unit.tile + 1].unit)
        }
        else checkArray.push(3)
        if(!(parseInt(unit.tile.toString().split('')[1]) >= 8)){
            if((tileArray[unit.tile + 2].unit)){
                checkArray.push(tileArray[unit.tile + 2].unit)
            }
            else checkArray.push(4)
            if(!(parseInt(unit.tile.toString().split('')[1]) >= 7)){

                if((tileArray[unit.tile + 3].unit)){
                    checkArray.push(tileArray[unit.tile + 3].unit)
                }
                else checkArray.push(5)
            }

        }

    }
    else {
        checkArray.push(3)
        checkArray.push(4)
        checkArray.push(5)
    }
    // checks in top y
    if(unit.tile >= 10){
        if((tileArray[unit.tile - 10].unit)){
            checkArray.push(tileArray[unit.tile - 10].unit)
        }
        else checkArray.push(6)
        if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
            // checks top right diagnal 1
            if((tileArray[unit.tile - 9].unit)){
                checkArray.push(tileArray[unit.tile - 9].unit)
            }
            else checkArray.push(7)
            if(!(unit.tile === 8 || unit.tile === 9 || parseInt(unit.tile.toString().split('')[1])  >= 8) && (tileArray[unit.tile - 8].unit)){
                // checks top right diagnal 2 b
                    checkArray.push(tileArray[unit.tile - 8].unit)
            }
            else checkArray.push(8)
        }
        else {
            checkArray.push(7)
            checkArray.push(8)
        }
        if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0)){

            //checks top left diagnal 1
            if((tileArray[unit.tile - 11].unit)){
                checkArray.push(tileArray[unit.tile - 11].unit)
            }   
            else checkArray.push(9)
            //checks top left diagnal 2 b, letter labels are from top down
            if((!(unit.tile === 1 || parseInt(unit.tile.toString().split('')[1] <= 1)) && (tileArray[unit.tile - 12].unit))){
                checkArray.push(tileArray[unit.tile - 12].unit)
            }
            else checkArray.push(10)
        }
        else {
            checkArray.push(9)
            checkArray.push(10)
        }
        if(unit.tile >= 20){
            if((tileArray[unit.tile - 20].unit)){
                checkArray.push(tileArray[unit.tile - 20].unit)
            }
            else {
                checkArray.push(11)
            }
            //checks top right dianal 2 a 
            if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9) && (tileArray[unit.tile - 19].unit)){
                    checkArray.push(tileArray[unit.tile - 19].unit)
            }
            else checkArray.push(12)
            //checks top left diagnal 2 a
            if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0) && (tileArray[unit.tile - 21].unit)){
                    checkArray.push(tileArray[unit.tile - 21].unit)
            }
            else checkArray.push(13)
            if(unit.tile >= 30){
                if((tileArray[unit.tile - 30].unit)){
                    checkArray.push(tileArray[unit.tile - 30].unit)
                }
                else checkArray.push(14)

            }
            else checkArray.push(14) 
        }
        else {
            checkArray.push(11)
            checkArray.push(12)
            checkArray.push(13)
            checkArray.push(14)
        }
    }
    else {
        checkArray.push(6)
        checkArray.push(7)
        checkArray.push(8)
        checkArray.push(9)
        checkArray.push(10)
        checkArray.push(11)
        checkArray.push(12)
        checkArray.push(13)
        checkArray.push(14)
    }
    //checks in bottom y
    if(unit.tile <= 49){
        if((tileArray[unit.tile + 10].unit)){
            checkArray.push(tileArray[unit.tile + 10].unit)
        }
        else checkArray.push(15)
            if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
                // checks bottom right diagnal 1
                if((tileArray[unit.tile + 11].unit)){
                    checkArray.push(tileArray[unit.tile + 11].unit)
                }
                else checkArray.push(16)
                if(!(unit.tile === 8 || parseInt(unit.tile.toString().split('')[1])  >= 8)){
                    // checks bottom right diagnal 2 a
                    if((tileArray[unit.tile + 12].unit)){
                        checkArray.push(tileArray[unit.tile + 12].unit)
                    }
                    else checkArray.push(17)
                }
            }
            else{
                checkArray.push(16)
                checkArray.push(17)
            }
            if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0)){
    
                //checks bottom left diagnal 1
                if((tileArray[unit.tile + 9].unit)){
                    checkArray.push(tileArray[unit.tile + 9].unit)
                }   
                else checkArray.push(18)
                //checks bottom left diagnal 2 a
                if((!(unit.tile === 1 || parseInt(unit.tile.toString().split('')[1] <= 1)) && (tileArray[unit.tile + 8].unit))){
                        checkArray.push(tileArray[unit.tile + 8].unit)
                }
                else checkArray.push(19)
            }
            else{
                checkArray.push(18)
                checkArray.push(19)
            }

            if(unit.tile <= 39){
                if((tileArray[unit.tile + 20].unit)){
                    checkArray.push(tileArray[unit.tile + 20].unit)
                }
                else checkArray.push(20)
                //checks bottom right dianal 2 b 
                if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
                    if((tileArray[unit.tile + 21].unit)){
                        checkArray.push(tileArray[unit.tile + 21].unit)
                    }
                    else checkArray.push(21)
                }
                if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0)){
                    //checks bottom left diagnal 2 a
                    if((tileArray[unit.tile + 19].unit)){
                        checkArray.push(tileArray[unit.tile + 19].unit)
                    }
                    else checkArray.push(22)
                }
                
                if(unit.tile <= 29 && tileArray[unit.tile + 30].unit){
                        checkArray.push(tileArray[unit.tile + 30].unit)
                    }
                    else checkArray.push(23)
            }
            else {
                checkArray.push(20)
                checkArray.push(21)
                checkArray.push(22)
                checkArray.push(23)
            }
        
    }
    else {
        checkArray.push(15)
        checkArray.push(16)
        checkArray.push(17)
        checkArray.push(18)
        checkArray.push(19)
        checkArray.push(20)
        checkArray.push(21)
        checkArray.push(22)
        checkArray.push(23)
    }

        return checkArray
}
let playerTurnChangeOver = () =>{
        //adds players recources at the end of the turn as well as making it their turn again
        playerGold += playerGpt
        playerTech += playerTpt
        if (maniplePt >= 0 ){
            for(let i = 0; i <= maniplePt ; i ++)
            hand.push(new Card("maniple"))
        } 
        playerUnitArray.forEach(event => {
                event.recharge()
        })
        
        playerTurn = true
}
//main animation loop
let animate = (time) =>{
    if(time-lastFrameTime < framMinTime){
        requestAnimationFrame(animate)
        return
    }
    
    lastFrameTime = time
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    turnHandler()
    drawDisplay()
    drawTiles()
    handHandler()
    if(mouse.clicked === true){
        mouse.clicked = false
    }
    if(!checkClickFrame()) mouse.lastClickFuntion = mouse.timesClicked 
    requestAnimationFrame(animate);
}

let startUp = () => {
    //picks player starting settlement
    let settlementTile = positionRandomizer(0,3)
    tileArray[settlementTile].building = new Settlement(settlementTile, "blue")
    //picks ai starting settlement
    let aiStartSettlement = positionRandomizer(7, 10)
    tileArray[aiStartSettlement].building = new Settlement(aiStartSettlement, "red")
    //gives player a bunch of forts for testing
    for( i = 0; i < 4; i ++){
        hand.push(new Card("fort"))
    }
    hand.push(new Card("maniple"))
    hand.push(new Card("aiTest"))
    animate()
}
startUp()