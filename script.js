let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var canvasPosition = canvas.getBoundingClientRect();

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

drawDisplay = () => {
    //bars for top and bottom
    ctx.fillStyle = '#84a8db'
    ctx.fillRect(0,0, canvas.width, canvas.height/15)
    ctx.fillRect(0, canvas.height/1.5, canvas.width, canvas.height/2)
    ctx.fillStyle = "red"
    ctx.fillRect(canvas.width/1.1, canvas.height/100, 100,40)
    ctx.fillStyle = "black"
    ctx.font = "30px Arial"
    ctx.fillText(playerGold, canvas.width/30, canvas.height/21)
    ctx.fillText("(" + playerGpt + ")+", canvas.width/20, canvas.height/21)
    ctx.fillText(playerTech, canvas.width/11, canvas.height/21)
    ctx.fillText("(" + playerTpt + ")+", canvas.width/9.3, canvas.height/21)
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



//building play field
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

            //handles unclicking or moving the unit to unselect all posible movement tiles 
            if(collison(this,mouse) && mouse.clicked == true && selectedUnit.selected === true && (this.highlighted == true || (selectedUnit && this.position === selectedUnit.tile && selectedUnit.selected == true))){
                if(!checkClickFrame()) return
                mouse.timesClicked ++
                selectedUnit.selected = false
                //tiles two to the left of the unit
                if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile == 0)){
                    if(!(selectedUnit.tile.toString().split('')[1] === "1")){
                        tileArray[selectedUnit.tile-2].highlighted = false
                    }
                    tileArray[selectedUnit.tile-1].highlighted = false
                }
                //tiles two to the right of selected unit
                if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile+1].highlighted = false
                    tileArray[selectedUnit.tile+2].highlighted = false
                }

                //top two as well as 
                if(!(selectedUnit.tile <= 9)){
                    if(!(selectedUnit.tile < 20)){
                        tileArray[selectedUnit.tile-20].highlighted = false
                    }
                    tileArray[selectedUnit.tile-10].highlighted = false
                    if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile-9].highlighted = false
                    }
                }
                if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile == 0 || selectedUnit.tile <= 9)){
                    tileArray[selectedUnit.tile-11].highlighted = false
                }
                if(!(selectedUnit.tile >= 50)){
                    tileArray[selectedUnit.tile+10].highlighted = false
                    if(!(selectedUnit.tile >= 40)){
                        tileArray[selectedUnit.tile+20].highlighted = false
                    }
                    if(!(selectedUnit.tile.toString().split('')[1] === "9"|| selectedUnit.tile == 9)){
                    tileArray[selectedUnit.tile+11].highlighted = false
                }
                    if(!(selectedUnit.tile.toString().split('')[1] === "0" || selectedUnit.tile==0)){
                        tileArray[selectedUnit.tile+9].highlighted = false
                    }
                }
                if(!(this.unit) &&  ((this.position === selectedUnit.tile - 2 || this.position === selectedUnit.tile + 2 || this.position === selectedUnit.tile - 20 || this.position === selectedUnit.tile + 20 || this.position === selectedUnit.tile - 11 || this.position === selectedUnit.tile + 11 || this.position === selectedUnit.tile - 9 || this.position === selectedUnit.tile + 9) && selectedUnit.energy > 1)){
                tileArray[selectedUnit.tile].unit = null
                this.unit = selectedUnit
                this.unit.tile = this.position
                this.unit.energy -= 2
                }
                if(!(this.unit) && ((this.position === selectedUnit.tile - 1 || this.position === selectedUnit.tile + 1 || this.position === selectedUnit.tile - 10 || this.position === selectedUnit.tile + 10) && selectedUnit.energy > 0)){
                    tileArray[selectedUnit.tile].unit = null
                    this.unit = selectedUnit
                    this.unit.tile = this.position
                    this.unit.energy -= 1
                }
                if(this.unit.align === "red" && selectedUnit.attacked == false){
                    Unit.prototype.attack.call(selectedUnit, this.unit)
                }
            }
            //handles selecting a unit and then highlighting all tiles it can move to
            if(collison(this, mouse) && mouse.clicked == true && this.unit){
                if(!checkClickFrame()) return
                mouse.timesClicked ++
                if( this.unit.align == "red") return
                if(selectedUnit && selectedUnit.selected == true && selectedUnit === this.unit) return
                selectedUnit = this.unit
                console.log(selectedUnit)
                selectedUnit.selected = true
                console.log(this.unit)
                // logic for picking tiles in x 
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0 )&& selectedUnit.energy > 0){
                    if(!(this.position.toString().split('')[1] === "1"  ) && selectedUnit.energy > 1){
                        tileArray[this.position-2].highlighted = true
                    }
                    tileArray[this.position-1].highlighted = true
                }
                if(!(this.position.toString().split('')[1] === "9"|| this.position == 9)){
                    if(selectedUnit.energy > 0){
                        tileArray[this.position+1].highlighted = true
                        if(selectedUnit.energy > 1){
                            tileArray[this.position+2].highlighted = true
                        }
                    }
                }
                // for top and top right corner
                if(!(this.position <= 9) && selectedUnit.energy > 0){
                    if(!(this.position < 20) && selectedUnit.energy > 1){
                        tileArray[this.position-20].highlighted = true
                    }
                    tileArray[this.position-10].highlighted = true
                    if(!(this.position.toString().split('')[1] === "9"|| this.position == 9) && selectedUnit.energy > 1){
                    tileArray[this.position-9].highlighted = true
                    }
                }
                // top left corner
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0 || this.position <= 9) && selectedUnit.energy > 1){
                    tileArray[this.position-11].highlighted = true
                }
                // bottom section
                if(!(this.position >= 50) && selectedUnit.energy > 0){
                    tileArray[this.position+10].highlighted = true
                    if(!(this.position >= 40) && selectedUnit.energy > 1){
                        tileArray[this.position+20].highlighted = true
                    }
                    if(!(this.position.toString().split('')[1] === "9"|| this.position == 9) && selectedUnit.energy > 1){
                    tileArray[this.position+11].highlighted = true
                }
                    if(!(this.position.toString().split('')[1] === "0" || this.position==0)  && selectedUnit.energy > 1){
                        tileArray[this.position+9].highlighted = true
                    }
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
            // if(this.unit.type == "maniple"){
            //     ctx.fillStyle = "red"
            //     ctx.fillRect(this.x, this.y, this.width, this.height)
            //     ctx.fillStyle = '#6789b9'
            // }
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
       this.attackSpeed = 1 
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
        if(this.direction === "right")
        target.health -= this.attack
        if(target.lifeCheck()){
            tileArray[target.tile].unit = null 
            aiUnitArray.splice(target.position, 1)
        }
        this.attacked = true
    }
}
//unit subclasses 
class Maniple extends Unit {
    constructor(position, tile, align){
        super(2, 1, 1, 2,  "maniple", position, tile, align) 
    }
    draw( x, y ){
        if (this.direction == "right" || this.direction == "left"){
            //base arrow
            if(this.align === "blue"){
                ctx.strokeStyle = "white"
            }
            else ctx.strokeStyle = "black"
            ctx.lineWidth = 10
            ctx.beginPath()
            ctx.moveTo( x + canvas.width/20, y + canvas.height/40)
            ctx.lineTo( x + canvas.width/14, y + canvas.height/20)
            ctx.lineTo( x + canvas.width/20, y + canvas.height/14)
            ctx.stroke()
            ctx.closePath()
            // first health bar, if empty unit is gone so i didnt include it
            ctx.strokeStyle= "#940404"
            ctx.beginPath()
            ctx.moveTo( x + (canvas.width/20)*1.19, y + (canvas.height/40)*1.44)
            ctx.lineTo( x + (canvas.width/14)*.94, y + (canvas.height/20)*0.9)
            ctx.stroke()
            ctx.closePath()
            if(this.health == 2 ){
                //second health bar
                ctx.beginPath()
                ctx.moveTo( x + canvas.width/20, y + canvas.height/40)
                ctx.lineTo( x + (canvas.width/20)*1.15, y + (canvas.height/40)*1.35)
                ctx.closePath()
                ctx.stroke()
            }
        }
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

        //spawns units if ai can afford it , and already placed a fort first
        if(aiGold > 0){
            let unitRandomizer = () => {
                let unitPosition = positionRandomizer(5,7)
                if(tileArray[unitPosition].unit)unitRandomizer()
                else return unitPosition
            }
            let unitPosition = unitRandomizer()
            tileArray[unitPosition].unit = new Maniple( aiUnitArray.length, unitPosition, 'red')
            aiUnitArray.push(tileArray[unitPosition].unit)
            aiUnitArray.forEach(e => {
                
                if(e.tile > 2 && (parseInt(e.tile.toString().split('')[1])) > 2 && !(tileArray[e.tile-2].unit) && e.energy === 2){
                    tileArray[e.tile].unit = null
                    tileArray[e.tile-2].unit = aiUnitArray[e.position]
                    aiUnitArray[e.position].tile -= 2
                }
                e.recharge()
            })
        }
    }



    playerTurnChangeOver()
}

let playerTurnChangeOver = () =>{
        //adds players recources at the end of the turn as well as making it their turn again
        playerGold += playerGpt
        playerTech += playerTpt
        if (maniplePt >= 0 ){
            for(let i = 0; i <= maniplePt ; i ++)
            hand.push(new Card("maniple"))
        } 
        tileArray.forEach(event => {
            if (event.unit){
                event.unit.recharge()
                console.log(event)
            }
        })
        
        playerTurn = true
}
//main animation loop
let animate = () =>{
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
    animate()
}
startUp()