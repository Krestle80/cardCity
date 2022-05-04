class Tech{
    constructor(){
        this.purchased = false
        this.titleArray = [ "Settlement",  "Wall", "Fortress", "Bank", "Armory", "Range", "Sharp Shots"]
        this.discriptionArray = [ "The heart of your empire, produces one gold and one maniple per turn.", "A two Health building to keep out invaders, you gain one wall card per turn", "An upgrade to the fort, gains two health, 1 gold pet turn and grants an extra maniple card every two turns", "economic building that has 5 health and grants 3 gold per turn", "an upgrade to the fort turns new maniple cards into triarii", "a two health building that grants a Sagittarii card every turn", "an upgrade to your shots that increases their damage by 1"]
        this.costArray = [0,4,5,5,4,5,5]
        this.purchasedArray = [1,0,0,0,0,0,0]
        this.selectedTech = 0
        this.exitHitbox = {
            x : canvas.width/1.268,
            y : canvas.height/6,
            width : canvas.width/60*Math.sin(Math.PI/4),
            height : canvas.width/60*Math.sin(Math.PI/4)
        }
        this.purchaseHitBox = {
            x: canvas.width*0.75,
            y: canvas.height*0.75,
            width: canvas.width/10,
            height: canvas.height/20

        }
    }
    draw(){
        //settlement
        drawSkillCardBack(0, 0, 1, this.purchasedArray[0], checkSkillCard(0, 0), 0)
        drawSettlement(canvas.width/2, canvas.height/2 + canvas.height/300, 0.75, drawingSettlement, techCtx)
        //Wall
        lineAt(canvas.width/2 + canvas.width/50, canvas.height/2 - canvas.width/50, -3*Math.PI/4, this.purchasedArray[1], 1)
        drawSkillCardBack(canvas.width/11.5, -canvas.height/6.5, 1, this.purchasedArray[1], checkSkillCard(canvas.width/11.5, -canvas.height/6.5), 1)
        drawWall(canvas.width/2 + canvas.width/12.6, canvas.height/2 -canvas.height/5.45, techCtx, drawingWall, 0.6)
        //fortress
        lineAt(canvas.width/2 + canvas.width/11.5 + canvas.width/50, canvas.height/2 -canvas.height/6.5 - canvas.width/50, -2*Math.PI/3, this.purchasedArray[2], 1)
        drawSkillCardBack(canvas.width/5.4, -canvas.height/3.53, 1, this.purchasedArray[2], checkSkillCard(canvas.width/5.4, -canvas.height/3.53,), 2)
        drawFortress(canvas.width/2 + canvas.width/5.73, canvas.height/2 - canvas.height/3.3, drawingFortress, techCtx, 0.9)
        //Bank
        lineAt(canvas.width/2 + canvas.width/11.5 + canvas.width/50, canvas.height/2 -canvas.height/6.5 + canvas.width/50, -Math.PI/3, this.purchasedArray[3], 1)
        drawSkillCardBack(canvas.width/5.4, -canvas.height/45, 1, this.purchasedArray[3], checkSkillCard(canvas.width/5.4, -canvas.height/45), 3)
        drawBank(canvas.width/2 + canvas.width/5.4, canvas.height/2 -canvas.height/45, drawingBank, techCtx, 0.9)
        //Armory
        lineAt(canvas.width/2 - canvas.width/50, canvas.height/2 - canvas.width/50, 3*Math.PI/4, this.purchasedArray[4], 1)
        drawSkillCardBack(-canvas.width/11.5, -canvas.height/6.5, 1, this.purchasedArray[4], checkSkillCard(-canvas.width/11.5, -canvas.height/6.5), 4)
        drawArmory(canvas.width/2 -canvas.width/11.5, canvas.height/2-canvas.height/6.8, drawingArmory, techCtx, 0.9)
        //Range
        lineAt(canvas.width/2 - canvas.width/11.5 - canvas.width/50, canvas.height/2 -canvas.height/6.5 - canvas.width/50, 2*Math.PI/3, this.purchasedArray[5], 1)
        drawSkillCardBack(-canvas.width/5.4, -canvas.height/3.53, 1, this.purchasedArray[5], checkSkillCard(-canvas.width/5.4, -canvas.height/3.53), 5)
        drawRange(canvas.width/2 -canvas.width/5.4, canvas.height/2 -canvas.height/3.53, drawingRange, techCtx, 0.8 )
        //Sharp Shots
        lineAt(canvas.width/2 - canvas.width/11.5 - canvas.width/50, canvas.height/2 -canvas.height/6.5 + canvas.width/50, Math.PI/3, this.purchasedArray[6], 1)
        drawSkillCardBack(-canvas.width/5.4, -canvas.height/45, 1, this.purchasedArray[6], checkSkillCard(-canvas.width/5.4, -canvas.height/45), 6)
        //exit X
        lineAt(canvas.width/1.25, canvas.height/6, Math.PI/4, 0, 0.25)
        lineAt(canvas.width/1.268, canvas.height/6, -Math.PI/4, 0, 0.25)
        //bottomline
        lineAt(canvas.width/7, canvas.height/ 1.75, -Math.PI/2, 0, 10.73)
        //title, cost,  and description
        techCtx.fillStyle = "#2762b5"
        techCtx.font = "40px ariel"
        techCtx.fillText(this.titleArray[this.selectedTech], canvas.width/4.75 ,canvas.height/1.6)
        techCtx.font = "30px ariel"
        techCtx.fillText(this.discriptionArray[this.selectedTech], canvas.width/6, canvas.height/1.4)

        techCtx.fillText(this.costArray[this.selectedTech], canvas.width/1.25 ,canvas.height/1.6)
        //purchaseButton
        techCtx.save()
        if(collison(this.purchaseHitBox, mouse)){
            techCtx.shadowColor = "yellow"
            techCtx.fillStyle = "#5b99f0"
        }
        else techCtx.shadowColor = "#5b99f0"
        if(this.purchasedArray[this.selectedTech] === 1) techCtx.fillStyle = "gray"
        techCtx.shadowBlur = 20
        techCtx.fillRect(this.purchaseHitBox.x, this.purchaseHitBox.y, this.purchaseHitBox.width, this.purchaseHitBox.height)
        techCtx.restore()
        techCtx.fillStyle = "white"
        techCtx.fillText("Purchase", canvas.width*0.77, canvas.height*0.784)
    }
    update(){
        if(collison(this.exitHitbox, mouse) && mouse.clicked == true){
            techCanvas.style.zIndex = -1
        }
        if(collison(this.purchaseHitBox, mouse) && mouse.clicked == true && this.purchasedArray[this.selectedTech] === 0 && playerTech >= this.costArray[this.selectedTech]){
            this.purchasedArray[this.selectedTech] = 1
            playerTech -= this.costArray[this.selectedTech]
        }
    }
}

let drawSkillCardBack = (x, y, scale, purchased, hover, selectedNum) =>{
    if(hover === true && mouse.clicked == true){
        playerTechTree.selectedTech = selectedNum
    }
    if (hover === true ){
        techCtx.lineWidth = 5
        techCtx.strokeStyle = "yellow"
    }
    else if( playerTechTree.selectedTech == selectedNum){
        techCtx.lineWidth = 5
        techCtx.strokeStyle = "yellow"
    }
    else if(purchased === 1){
        techCtx.lineWidth = 5
        techCtx.strokeStyle = "gray"
    }
    techCtx.save()
    techCtx.translate(canvas.width/2 - canvas.width/50, canvas.height/2 - canvas.width/50)
    techCtx.fillStyle = "#6789b9" 
    techCtx.fillRect(x, y, (canvas.width/25)*scale, (canvas.width/25)*scale)
    
    // techCtx.strokeStyle = "#2762b5"
    
    techCtx.strokeRect(x, y, (canvas.width/25)*scale, (canvas.width/25)*scale)
    
    techCtx.restore()
}
let checkSkillCard = (x, y) => {
    x += canvas.width/2 - canvas.width/50
    y +=  canvas.height/2 - canvas.width/50
    let hitBox = {
        x : x,
        y : y,
        width: (canvas.width/25),
        height : (canvas.width/25)
    }
    if(collison(hitBox, mouse)) return true
    else return false
    

}
let lineAt = (x, y, angle, purchased, scale) =>{
    techCtx.lineWidth = 6
    if(purchased === 1)techCtx.strokeStyle = "gray"
    else techCtx.strokeStyle = "#2762b5"
    techCtx.save()
    techCtx.translate(x, y)
    techCtx.rotate(angle)
    // techCtx.rotate(angle)
    techCtx.beginPath()
    techCtx.moveTo(0, 0)
    techCtx.lineTo(0, canvas.width/15*scale)
    techCtx.closePath()
    techCtx.stroke()
    techCtx.restore()
}

let drawingSettlement = new Settlement(-1, "blue")
let drawingWall = new Wall(-1, "blue")
let drawingFortress = new Fortress(-1, "blue")
let drawingBank = new Bank(-1, "blue")
let drawingArmory = new Armory(-1, "blue")
let drawingRange = new BuildingRange(-1, "blue")
console.log(canvas.width/2 + canvas.width/50, canvas.height/2 - canvas.width/50, canvas.width/15)
console.log(Math.sin(Math.PI/4)*128)