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
        if (this.type === "fort"){
            drawCardBase(x,this.y, "Fort")
            drawFortCard(x, this.y)
        }
        else if (this.type === "maniple"){
            drawCardBase(x, this.y, "Manliple")
            drawManipleCard(x, this.y)
        }
        ctx.fillStyle = 'white'
        ctx.strokeStyle = '#2762b5'
    }
}