
let topDisplayClick = () => {
    if(collison(nextTurnHitBox, mouse) && mouse.clicked == true && playerTurn == true){
        turnHandler()
    }
    
    if(collison(techHitBox, mouse) && mouse.clicked == true){
        displayTechscreen()
    }

}