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
//global variable to hold wether or not a unit has been clicked on

// var to hold the tile array position of currently selected unit
let selectedUnit = {
    selected: false,
    position: null,
    type: null
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
    clicked: false
};

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
//building play field
let tileArray = []

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
            //handles selecting a unit and then highlighting all tiles it can move to
            if(collison(this, mouse) && mouse.clicked == true && this.unit && selectedUnit.selected == false){
                selectedUnit.type = this.unit
                selectedUnit.selected = true
                selectedUnit.position = this.position
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0)){
                    if(!(this.position.toString().split('')[1] === "1")){
                        tileArray[this.position-2].highlighted = true
                    }
                    tileArray[this.position-1].highlighted = true
                }
                if(!(this.position.toString().split('')[1] === "9"|| this.position == 9)){
                    tileArray[this.position+1].highlighted = true
                    tileArray[this.position+2].highlighted = true
                }
                if(!(this.position <= 9)){
                    if(!(this.position < 20)){
                        tileArray[this.position-20].highlighted = true
                    }
                    tileArray[this.position-10].highlighted = true
                    if(!(this.position.toString().split('')[1] === "9"|| this.position == 9)){
                    tileArray[this.position-9].highlighted = true
                    }
                }
                if(!(this.position.toString().split('')[1] === "0" || this.position == 0 || this.position <= 9)){
                    tileArray[this.position-11].highlighted = true
                }
                if(!(this.position >= 50)){
                    tileArray[this.position+10].highlighted = true
                    if(!(this.position >= 40)){
                        tileArray[this.position+20].highlighted = true
                    }
                    if(!(this.position.toString().split('')[1] === "9"|| this.position == 9)){
                    tileArray[this.position+11].highlighted = true
                }
                    if(!(this.position.toString().split('')[1] === "0" || this.position==0)){
                        tileArray[this.position+9].highlighted = true
                    }
                }
                
            }
        //handles unclicking the unit to unselect all posible movement tiles
            if(collison(this,mouse) && mouse.clicked == true && this.highlighted == true ){
                selectedUnit.selected = false
                if(!(this.unit)){
                tileArray[selectedUnit.position].unit = null
                this.unit = selectedUnit.type
                }
                if(!(selectedUnit.position.toString().split('')[1] === "0" || selectedUnit.position == 0)){
                    if(!(selectedUnit.position.toString().split('')[1] === "1")){
                        tileArray[selectedUnit.position-2].highlighted = false
                    }
                    tileArray[selectedUnit.position-1].highlighted = false
                }
                if(!(selectedUnit.position.toString().split('')[1] === "9"|| selectedUnit.position == 9)){
                    tileArray[selectedUnit.position+1].highlighted = false
                    tileArray[selectedUnit.position+2].highlighted = false
                }
                if(!(selectedUnit.position <= 9)){
                    if(!(selectedUnit.position < 20)){
                        tileArray[selectedUnit.position-20].highlighted = false
                    }
                    tileArray[selectedUnit.position-10].highlighted = false
                    if(!(selectedUnit.position.toString().split('')[1] === "9"|| selectedUnit.position == 9)){
                    tileArray[selectedUnit.position-9].highlighted = false
                    }
                }
                if(!(selectedUnit.position.toString().split('')[1] === "0" || selectedUnit.position == 0 || selectedUnit.position <= 9)){
                    tileArray[selectedUnit.position-11].highlighted = false
                }
                if(!(selectedUnit.position >= 50)){
                    tileArray[selectedUnit.position+10].highlighted = false
                    if(!(selectedUnit.position >= 40)){
                        tileArray[selectedUnit.position+20].highlighted = false
                    }
                    if(!(selectedUnit.position.toString().split('')[1] === "9"|| selectedUnit.position == 9)){
                    tileArray[selectedUnit.position+11].highlighted = false
                }
                    if(!(selectedUnit.position.toString().split('')[1] === "0" || selectedUnit.position==0)){
                        tileArray[selectedUnit.position+9].highlighted = false
                    }
                }

            }
            //handles placing a maniple
            if(collison(this, mouse) && mouse.clicked == true && selectedCard === "maniple" && this.align == "blue" && playerGold > 0 ){
                if(this.building || this.unit) return
                this.unit = new Maniple(this.position, "blue")
                console.log(this.unit.type)
                hand.splice(handPosition, 1)
                selectedCard = null
                playerGold -= 1
            }    
        }
    }
    draw(){
        ctx.lineWidth = 5
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
        else if(this.unit){
            if(this.unit.type == "maniple"){
                ctx.fillStyle = "red"
                ctx.fillRect(this.x, this.y, this.width, this.height)
                ctx.fillStyle = '#6789b9'
            }
        }
        else{
            
            ctx.strokeStyle = "black"
            ctx.lineWidth = 1
            if(this.align === "blue"){ctx.fillStyle = "#5b99f0"}
            if(this.align === "red"){ctx.fillStyle = "#f54949"}
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.strokeRect(this.x,this.y,this.width,this.height)
            ctx.fillStyle = '#6789b9'
        }        

    }
    select(){
        if(collison(this, mouse) || this.highlighted == true){
            ctx.strokeStyle = "yellow"
            ctx.lineWidth = 5
            ctx.strokeRect(this.x,this.y,this.width,this.height)
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
    constructor(health, attack, range, maxEnergy, type, position, align){
       this.health = health
       this.attack = attack
       this.attacked = true
       this.range = range
       this.energy = 0
       this.maxEnergy = maxEnergy
       this.type = type
       this.position = position
       this.align = align
    }
    lifeCheck(){
        if(this.health > 0) return true
        return false
    }
}
//unit subclasses 
class Maniple extends Unit {
    constructor(position, align){
        super(2, 1, 1, 2,  "maniple", position, align) 
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
    if(collison(nextTurnHitBox, mouse) && mouse.clicked == true)
    {
        playerGold += playerGpt
        playerTech += playerTpt
        if (maniplePt >= 0 ){
            for(let i = 0; i <= maniplePt ; i ++)
            hand.push(new Card("maniple"))
        } 
        playerTurn = false
    }
}
//main animation loop
let animate = () =>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
    turnHandler()
    drawDisplay()
    drawTiles()
    handHandler()
    if(mouse.clicked == true){
        mouse.clicked= false
    }
    requestAnimationFrame(animate);
}

let startUp = () => {
    //picks player starting settlement
    let startx = Math.floor(Math.random()*3)
    let starty = (Math.floor(Math.random()*6))*10
    let settlementTile = startx+starty
    tileArray[settlementTile].building = new Settlement(settlementTile, "blue")
    //picks ai starting settlement
    let aiStartx = Math.floor((Math.random()*2) + 7 )
    let aiStarty = (Math.floor(Math.random()*6))*10
    let aiStartSettlement = aiStartx + aiStarty
    tileArray[aiStartSettlement].building = new Settlement(aiStartSettlement, "red")
    for( i = 0; i < 4; i ++){
        hand.push(new Card("fort"))
    }
    hand.push(new Card("maniple"))
    animate()
}
startUp()