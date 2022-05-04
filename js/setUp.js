let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')
canvas.width = 1920
canvas.height = 1080
var canvasPosition = canvas.getBoundingClientRect();

let scaleX = canvas.width/canvasPosition.width
let scaleY = canvas.height/canvasPosition.height

let techCanvas = document.getElementById('canvas2')
let techCtx = techCanvas.getContext('2d')
techCanvas.width = 1920
techCanvas.height = 1080

//variabeles for setting framerate
let fps = 30;
let framMinTime = (1000/60)*(60/fps)- (1000/60)*0.5
let lastFrameTime = 0
//game rule variables
var turnCounter = 0

let hand = []
let selectedCard = null
let handPosition = null
let playerGold = 1
let playerGpt = 1
let playerTech = 0
let playerTpt = 1
let maniplePt = 0
let playerTurn = true

let aiGold = 1
let aiGpt = 1
let aiTech = 0
let aiTpt = 1
let aiManiplePt = -1


// arrays to hold a bunch of objects
let tileArray = []
let unitArray = []
let playerUnitArray = []
let aiUnitArray = []
let capitalArray = []


//global object to hold data on a selected unit
let selectedUnit = ""


let positionRandomizer = (minX, maxX) =>{
    let x = Math.floor((Math.random()*(maxX-minX)) + minX )
    let y = (Math.floor(Math.random()*(5)))*10
    return x + y
    
}
//mouse data for handling clicks
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
    mouse.x = (e.x*scaleX) - canvasPosition.left;
    mouse.y = (e.y*scaleY) - canvasPosition.top;
})

techCanvas.addEventListener('mousedown', (e) =>{
    mouse.clicked = true
})

techCanvas.addEventListener('mouseup', (e) =>{
    mouse.clicked = false
})

techCanvas.addEventListener('mousemove', (e) => {
    mouse.x = (e.x*scaleX) - canvasPosition.left;
    mouse.y = (e.y*scaleY) - canvasPosition.top;
})

let collison = (first, second) =>{
    if(!(first.x > second.x + second.width || 
        first.x + first.width < second.x || 
        first.y > second.y + second.height ||
        first.y + first.height < second.y)) {
            return true;
    }
    else return false
};


