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