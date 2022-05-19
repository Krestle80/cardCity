let drawUnits = () =>{
    unitArray.forEach((element) =>{element.draw(tileArray[element.tile].x,tileArray[element.tile].y)})
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
        selectedUnit = null
        playerTurn = true
}

let blueLoss = ()=> {
    ctx.fillStyle = "white"
    ctx.fillRect(canvas.width/2.9, canvas.height/3.2, canvas.width/3.33, canvas.height/6)
    ctx.fillStyle = "black"
    ctx.fillText("You Lose :'(", canvas.width/2.2, canvas.height/2.5)


}
let blueWin = () => {
    ctx.fillStyle = "white"
    ctx.fillRect(canvas.width/2.9, canvas.height/3.2, canvas.width/3.33, canvas.height/6)
    ctx.fillStyle = "black"
    ctx.fillText("You Win :')", canvas.width/2.2, canvas.height/2.5)
}
//main animation loop
let animate = (time) =>{
    if(time-lastFrameTime < framMinTime){
        requestAnimationFrame(animate)
        return
    }
    lastFrameTime = time
    if(theta >=100) theta = 0
    theta += 0.1
    if(techCanvas.style.zIndex <= 0){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.clearRect(0,0, canvas.width, canvas.height)
        topDisplayClick()
        drawDisplay()
        drawTiles()
        handHandler()
        drawUnits()
       
    }else  drawTechScreen()

    if(capitalArray[0].health === 0){
        blueLoss()
        return
    }
    if(capitalArray[1].health === 0){
        blueWin()
        return
    }
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
    capitalArray.push(tileArray[settlementTile].building)
    //picks ai starting settlement
    let aiStartSettlement = positionRandomizer(7, 10)
    tileArray[aiStartSettlement].building = new Settlement(aiStartSettlement, "red")
    capitalArray.push(tileArray[aiStartSettlement].building)
    //gives player a bunch of cards for testing
    hand.push(new Card("fort"))
    hand.push(new Card("maniple"))
    hand.push(new Card("aiTest"))
    // hand.push(new Card("wall"))
    // hand.push(new Card("fortress"))
    // hand.push(new Card("bank"))
    // hand.push(new Card("armory"))
    // hand.push(new Card("range"))
    // hand.push(new Card("armory"))
    console.log(hand)
    animate()
}
startUp()