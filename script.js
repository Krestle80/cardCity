let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var canvasPosition = canvas.getBoundingClientRect();

let sample = new Image();
sample.src = 'trialCard.png'
drawTopBottom = () => {
    ctx.fillRect(0,0, canvas.width, canvas.height/15)
    ctx.fillRect(0, canvas.height/1.5, canvas.width, canvas.height/2)
}

const mouse = {
    x:0,
    y:0,
    width:0.1,
    height:0.1,
};

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
    }
    draw(){
        ctx.lineWidth = 5
        if(collison(this, mouse)){
            ctx.strokeStyle = "yellow"
            ctx.strokeRect(this.x,this.y,this.width,this.height)
            ctx.strokeStyle = '#2762b5'
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
    constructor(){
        this.x = 0
        this.y = canvas.height/1.45
        this.width = canvas.width/10
        this.height = canvas.height/3.4
        this.type = 0
    }
    draw(x){
        this.x = x
        if(collison(this, mouse)){
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
        ctx.fillStyle = 'white'
        ctx.strokeStyle = '#2762b5'
    }
}
let handHandler = () => {
    let cardGap = 10
    for(i = 0; i < hand.length; i ++){
        hand[i].draw(cardGap + (i*canvas.width/9))
    } 

}
let hand = [new Card, new Card, new Card, new Card, new Card, new Card, new Card, new Card, new Card]
//main animation loop
let animate = () =>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawTopBottom()
    drawTiles()
    handHandler()
    requestAnimationFrame(animate);
}
animate()