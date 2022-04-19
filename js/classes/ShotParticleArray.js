class ShotParticleArray {
    constructor(x,y,num){
        this.x = x
        this.y = y 
        this.num = num
        this.array = []
    }
    makeArray(){
        this.array = []
        for(let i = 0; i <this.num - 1; i++){
            this.array.push(new ShotParticle(Math.random()*(Math.PI*2), Math.random()*(Math.PI),this.x, this.y, i))
        }
    }
    update(){
        this.array.forEach((particle) =>{
            particle.update()
            if(particle.remove == true){
                this.array.splice(particle.arrayPositon, 1)
                for(let j = 0; j < this.array; j ++){
                    this.array[j].position = j
                }
            }
        })
    }
    draw(){
        this.array.forEach((particle)=>{particle.draw()})
    }
}