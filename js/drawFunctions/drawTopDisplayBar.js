let nextTurnHitBox = {
    x: canvas.width/1.1,
    y: canvas.height/100,
    width:100,
    height: 40
}

let techHitBox = {
    x: canvas.width/2.07,
    y: canvas.height/100,
    width: 70,
    height: 40
}

let topDisplayGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/15, canvas.width/2, 0)
topDisplayGradient.addColorStop(0.05, "#4d6a93")
topDisplayGradient.addColorStop(0.12, "#bccde6")
topDisplayGradient.addColorStop(0.5, "#84a8db")

let bottomDisplayGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/1.5, canvas.width/2, canvas.height)
bottomDisplayGradient.addColorStop(0.02, "#4d6a93")
bottomDisplayGradient.addColorStop(0.08, "#bccde6")
bottomDisplayGradient.addColorStop(0.3, "#84a8db")

drawDisplay = () => {
    //bar for top
    ctx.fillStyle = topDisplayGradient
    ctx.fillRect(0,0, canvas.width, canvas.height/15)
    
    ctx.fillStyle = "black"
    ctx.font = "30px Arial"
    ctx.fillText(playerGold, canvas.width/30, canvas.height/21)
    ctx.fillText("(" + playerGpt + ")+", canvas.width/20, canvas.height/21)
    drawCoin(canvas.width/50, canvas.height/26, canvas.height/100)
    ctx.fillText(playerTech, canvas.width/11, canvas.height/21)
    ctx.fillText("(" + playerTpt + ")+", canvas.width/9.3, canvas.height/21)

    ctx.fillStyle="green"
    ctx.fillRect(canvas.width/2.07, canvas.height/100, 70,40)
    
    ctx.fillStyle = "red"
    ctx.fillRect(canvas.width/1.1, canvas.height/100, 100,40)
    // blue background gradient for cards
    ctx.fillStyle = bottomDisplayGradient
    ctx.fillRect(0, canvas.height/1.5, canvas.width, canvas.height/2)
}