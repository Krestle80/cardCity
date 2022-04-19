class ShotParticle {
    constructor(delta, theta, x, y, arrayPosition){
        this.delta = delta 
        this.theta = theta
        this.scale = 0.7
        this.distanceScale = Math.random()*50 + 20
        this.x = Math.cos(delta)*this.distanceScale + x
        this.y = Math.sin(delta)*this.distanceScale + y
        this.remove = false
        this.arrayPosition = arrayPosition
        this.arrayCenterX = x
        this.arrayCenterY = y 
    }
    update(){
        if(this.scale >= 0.01)this.scale -= 0.03
        else this.remove = true
        this.distanceScale += 3
        this.theta += Math.PI/5
        this.x = Math.cos(this.delta)*this.distanceScale + this.arrayCenterX
        this.y = Math.sin(this.delta)*this.distanceScale + this.arrayCenterY
    }
    draw(){
        ctx.lineWidth = 2
        ctx.strokeStyle = "#940404"
        ctx.save()
        ctx.beginPath()
        ctx.translate( this.x, this.y)
        ctx.rotate(theta)
        ctx.moveTo( 0, 0)
        ctx.lineTo(0, 10*this.scale )
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, 10*this.scale)
        ctx.lineTo(10*this.scale, 10*this.scale)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
    }
}