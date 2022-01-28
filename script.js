let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var canvasPosition = canvas.getBoundingClientRect();
let hand = []
let selectedCard = null
let handPosition = null
let sample = new Image( canvas.width/10, canvas.height/3.4);
sample.src = 'trialCard.png'
drawTopBottom = () => {
    ctx.fillStyle = '#84a8db'
    ctx.fillRect(0,0, canvas.width, canvas.height/15)
    ctx.fillRect(0, canvas.height/1.5, canvas.width, canvas.height/2)
    ctx.fillStyle = "red"
    ctx.fillRect(canvas.width/1.1, canvas.height/100, 100,40)
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
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = canvas.width/10
        this.height = canvas.height/10
        this.building = null 
        this.unit = null
    }
    update(){
        if(collison(this, mouse) && mouse.clicked == true && selectedCard === "fort"  ){
            if(this.building) return
            this.building = selectedCard
            hand.splice(handPosition, 1)
            selectedCard = null
        }
    }
    draw(){
        ctx.lineWidth = 5
        if(collison(this, mouse)){
            ctx.strokeStyle = "yellow"
            ctx.strokeRect(this.x,this.y,this.width,this.height)
            ctx.strokeStyle = '#2762b5'
        }
        if(this.building === "fort"){
            ctx.fillStyle = "blue"
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = '#6789b9'
        }
        if(this.building === "settlement"){
            ctx.fillStyle = "orange"
            ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.fillStyle = '#6789b9'
        }
        // else{
        // ctx.strokeRect(this.x,this.y,this.width,this.height)}
    }
}

let gridMaker = () =>{
    for(let y = canvas.height/15; y < canvas.height/1.6; y += canvas.height/10){
        for(let x =0; x < canvas.width; x += canvas.width/10){
            tileArray.push(new Tile(x,y))
        }
    }
}
gridMaker()

drawTiles = () =>{
    for(let i = 0; i < tileArray.length; i ++){
        tileArray[i].draw()
        tileArray[i].update()
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
//cards

class Card {
    constructor(type){
        this.x = 0
        this.y = canvas.height/1.45
        this.width = canvas.width/10
        this.height = canvas.height/3.4
        this.type = type
        this.selected = false
    }
    update(){
                if(collison(this, mouse) && mouse.clicked === true){
                if(this.selected == true) return
                selectedCard = this.type
                this.selected = true
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

        ctx.drawImage(sample, x - canvas.width/250, this.y - canvas.height/120)
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

//main animation loop
let animate = () =>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawTopBottom()
    drawTiles()
    handHandler()
    requestAnimationFrame(animate);
}

let startUp = () => {
    let startx = Math.floor(Math.random()*3)
    let starty = (Math.floor(Math.random()*6))*10
    let settlementTile = startx+starty
    tileArray[settlementTile].building = "settlement" 
    for( i = 0; i < 9; i ++){
        hand.push(new Card("fort"))
    }
    animate()
}
startUp()