//handles the player ending their turn 
let turnHandler = () =>{
    if(collison(nextTurnHitBox, mouse) && mouse.clicked == true && playerTurn == true)
    {
        //adds ai recouces
        aiGold += aiGpt
        aiTech += aiTpt
        if (maniplePt > 0 ){
            for(let i = 0; i < maniplePt ; i ++)
            hand.push(new Card("maniple"))
        }
        playerTurn = false
        turnCounter +=1
        aiHandler()
    }
}

let aiHandler = () =>{
    if(turnCounter > 1){
        aiUnitArray.forEach(unit =>{
            unit.recharge()
        })
    }
    let randomFortsCounter = 0
    //spawns forts 
    if (aiGold > 3 && turnCounter < 25){
        let fortRandomizer = () =>{
            let fortPosition = 0
            randomFortsCounter += 1
            if(turnCounter < 14){
                fortPosition = positionRandomizer(7, 9)
            }
            else fortPosition = positionRandomizer(5, 7)
            if(tileArray[fortPosition].building ){
                return fortRandomizer()
            }
            else if(randomFortsCounter >= 35) fortPosition = undefined
            return fortPosition
        }
        if(turnCounter < 25) {
            randomFortsCounter = 0
            let fortPosition = fortRandomizer()
            console.log(fortPosition)
            if(fortPosition){
                tileArray[fortPosition].building = new Fort(fortPosition, 'red')
                aiGold -= 1 
                aiGpt +=1
            }

        }
        // spawns units if ai can afford it , and already placed a fort first
        let iterations = 0
        if(aiGold > 0){
            let unitRandomizer = () => {
                
                let unitPosition = positionRandomizer(5,7)
                if(tileArray[unitPosition].unit) unitRandomizer()
                else if (iterations >=35){
                    unitPosition = undefined
                    return unitPosition
                }
                else{
                    iterations += 1
                    return unitPosition
                }
            }
            iterations = 0
            let unitPosition = unitRandomizer()
            console.log(unitPosition)
            if(unitPosition){
                tileArray[unitPosition].unit = new Maniple( aiUnitArray.length, unitPosition, 'red')
                aiUnitArray.push(tileArray[unitPosition].unit)
            }
            
        }
    }
    aiUnitArray.forEach(e => {
        //check for units within three tiles and save them into an array
        let checkArray = checkUnitsThree(e)
        console.log(checkArray)

            if(!(checkArray[0] === 0) && e.attacked === false){
                if(checkArray[0].align === "blue"){
                    if((checkArray[9] === 9  && (checkArray[0].direction === "right" || !checkArray[0].unitBuildCheck) && checkArray[0].health === 2 && !e.tile <= 9 && e.energy > 1 )){
                        aiUnitMoveAndAttack(e, -11, "bottom", 2, checkArray[0])
                    }
                    else if(checkArray[18] === 18 && (checkArray[0].direction === "right" || !checkArray[0].unitBuildCheck) && checkArray[0].health === 2 && !(e.tile >= 49) && e.energy > 1 && checkArray[0].direction === "right"  && e.energy > 1){
                        aiUnitMoveAndAttack(e, 9, "top", 2, checkArray[0])
                    }
                    else {
                        e.direction = "left"
                        Unit.prototype.attack.call(e, checkArray[0])
                    }
                }
            }
            if(!(checkArray[3] === 3 ) && e.attacked === false){
                if(checkArray[3].align === "blue"){
                    if((checkArray[7] === 7  && (checkArray[3].direction === "left" || !checkArray[3].unitBuildCheck)&& checkArray[3].health === 2 && !(e.tile <= 9) && e.energy > 1)){
                        aiUnitMoveAndAttack(e, -9, "bottom", 2, checkArray[3])
                    }
                    else if(checkArray[16] === 16 && (checkArray[3].direction === "left" || !checkArray[3].unitBuildCheck) && checkArray[3].health === 2 && !(e.tile >= 49) && e.energy > 1){
                        aiUnitMoveAndAttack(e, 11, "top", 2, checkArray[3])
                    }
                    else {
                        e.direction = "right"
                        Unit.prototype.attack.call(e, checkArray[3])
                    }
                }
            }
            if(!(checkArray[6] === 6)){
                if(checkArray[6].align === "blue"){
                    if((checkArray[7] === 7  && (checkArray[6].direction === "bottom" || !checkArray[6].unitBuildCheck) && checkArray[6].health === 2 && !parseInt(e.tile.toString().split('')[1]) === 9) && !e.tile === 9 && e.energy > 1){
                        aiUnitMoveAndAttack(e, -9, "left", 2, checkArray[6])
                    }
                    else if(checkArray[9] === 9 && (checkArray[6].direction === "bottom" || !checkArray[6].unitBuildCheck) && checkArray[6].health === 2 && !(e.tile === 0) && !parseInt(e.tile.toString().split('')[1]) === 0 && e.energy > 1){
                        aiUnitMoveAndAttack(e, -11, "right", 2, checkArray[6])
                    }
                    else {
                        e.direction = "top"
                        Unit.prototype.attack.call(e, checkArray[6])
                    }
                }
            }
            if(!(checkArray[15] === 15)){
                if(checkArray[15].align === "blue"){
                    if((checkArray[16] === 16  && (checkArray[15].direction === "top" || !checkArray[15].unitBuildCheck) && checkArray[15].health === 2 && !parseInt(e.tile.toString().split('')[1]) === 9) && !e.tile === 9 && e.energy > 1){
                        aiUnitMoveAndAttack(e, 11, "left", 2, checkArray[15])
                    }
                    else if(checkArray[9] === 9 && (checkArray[15].direction === "top"  || !checkArray[15].unitBuildCheck) && checkArray[15].health === 2 && !(e.tile === 0) && !parseInt(e.tile.toString().split('')[1]) === 0 && e.energy > 1){
                        aiUnitMoveAndAttack(e, 9, "right", 2, checkArray[15])
                    }
                    else {
                        e.direction = "bottom"
                        Unit.prototype.attack.call(e, checkArray[15])
                    }
                }
            }
            if(!(checkArray[9] === 9) && e.energy > 0){
                if(checkArray[9].align === "blue"){
                    if((checkArray[9].direction !== "right" || !checkArray[9].unitBuildCheck) && checkArray[6] === 6){
                        aiUnitMoveAndAttack(e, -10, "left", 1, checkArray[9])
                    }
                    else if(checkArray[0] === 0 ){
                        aiUnitMoveAndAttack(e, -1, "top", 1, checkArray[9])
                    }
    
                }
            }
            if(!(checkArray[18] === 18) && e.energy > 0){
                if(checkArray[18].align === "blue"){
                    if(checkArray[18].direction !== "right" && checkArray[15] === 15){
                        aiUnitMoveAndAttack(e, 10, "left", 1, checkArray[18])
                    }
                    else if(checkArray[0] === 0 ){
                        aiUnitMoveAndAttack(e, -1, "bottom", 1, checkArray[18])
                    }

                }

            }
            if(!(checkArray[7] === 7) && e.energy > 0){
                if(checkArray[7].align === "blue"){
                    if(checkArray[7].direction !== "left" && checkArray[6] === 6){
                        aiUnitMoveAndAttack(e, -10, "right", 1, checkArray[7])
                    }
                    else if(checkArray[3] === 3 ){
                        aiUnitMoveAndAttack(e, 1, "top", 1, checkArray[7])
                    }

                }

            }
            if(!(checkArray[16] === 16) && e.energy > 0){
                if(checkArray[16].align === "blue"){
                    if(checkArray[16].direction !== "left" && checkArray[15] === 15){
                        aiUnitMoveAndAttack(e, 10, "right", 1, checkArray[16])
                    }
                    else if(checkArray[3] === 3 ){
                        aiUnitMoveAndAttack(e, 1, "bottom", 1, checkArray[16])
                    }

                }

            }
            if(!(checkArray[1] === 1) && e.energy > 0){
                if(checkArray[1].align === "blue" && checkArray[0] === 0){
                    aiUnitMoveAndAttack(e,-1,"left", 1, checkArray[1])
                }
            }
            if(!(checkArray[4] === 4) && e.energy > 0){
                if(checkArray[4].align === "blue" && checkArray[3] === 3){
                    aiUnitMoveAndAttack(e,1,"right", 1, checkArray[4])
                }
            }
            if(!(checkArray[11] === 11) && e.energy > 0){
                if(checkArray[11].align === "blue" && checkArray[6] === 6){
                    aiUnitMoveAndAttack(e,-10,"top", 1, checkArray[11])
                }
            }
            if(!(checkArray[20] === 20) && e.energy > 0){
                if(checkArray[20].align === "blue" && checkArray[15] === 15){
                    aiUnitMoveAndAttack(e,10,"bottom", 1, checkArray[20])
                }
            }
            if(!(checkArray[2] === 2) && e.energy > 1){
                if(checkArray[2].align === "blue" && checkArray[1] === 1){
                    aiUnitMoveAndAttack(e,-2,"left", 2, checkArray[2])
                }
            }
            if(!(checkArray[10] === 10) && e.energy > 1){
                if(checkArray[10].align === "blue" ){
                    if(checkArray[10].direction === "right" && checkArray[1] === 1){
                        aiUnitMoveAndAttack(e,-2,"top", 2, checkArray[10])
                    }
                    else if(checkArray[9] === 9) aiUnitMoveAndAttack(e,-11,"left", 2, checkArray[10])

                }
            }
            if(!(checkArray[13] === 13) && e.energy > 1){
                if(checkArray[13].align === "blue"){
                    if(checkArray[13].direction === "right" && checkArray[9] === 9){
                        aiUnitMoveAndAttack(e,-11,"top", 2, checkArray[13])
                    }
                    else if(checkArray[11] === 11){ aiUnitMoveAndAttack(e,-20,"left", 2, checkArray[13])}
                }
            }
            if(!(checkArray[14] === 14) && e.energy > 1){
                if(checkArray[14].align === "blue" && checkArray[11] === 11){
                    aiUnitMoveAndAttack(e,-20,"top", 2, checkArray[14])
                }
            }
            if(!(checkArray[19] === 19) && e.energy > 1){
                if(checkArray[19].align === "blue" ){
                    if(checkArray[19].direction === "right" && checkArray[1] === 1){
                        aiUnitMoveAndAttack(e,-2,"bottom", 2, checkArray[19])
                    }
                    else if(checkArray[18] === 18) aiUnitMoveAndAttack(e, 9,"left", 2, checkArray[19])

                }
            }
            if(!(checkArray[22] === 22) && e.energy > 1){
                if(checkArray[22].align === "blue"){
                    if(checkArray[22].direction === "right" && checkArray[18] === 18){
                        aiUnitMoveAndAttack(e, 9,"bottom", 2, checkArray[22])
                    }
                    else if(checkArray[20] === 20){ aiUnitMoveAndAttack(e,20,"left", 2, checkArray[22])}
                }
            }
            if(!(checkArray[23] === 23) && e.energy > 1){
                if(checkArray[23].align === "blue" && checkArray[20] === 20){
                    aiUnitMoveAndAttack(e,20,"bottom", 2, checkArray[23])
                }
            }
            if(!(checkArray[21] === 21) && e.energy > 1){
                if(checkArray[21].align === "blue" ){
                    if(checkArray[21].direction === "top" && checkArray[20] === 20){
                        aiUnitMoveAndAttack(e,20,"right", 2, checkArray[21])
                    }
                    else if(checkArray[16] === 16) aiUnitMoveAndAttack(e, 9,"bottom", 2, checkArray[21])

                }
            }
            if(!(checkArray[17] === 17) && e.energy > 1){
                if(checkArray[17].align === "blue"){
                    if(checkArray[17].direction === "top" && checkArray[16] === 16){
                        aiUnitMoveAndAttack(e, 11,"right", 2, checkArray[17])
                    }
                    else if(checkArray[4] === 4){ aiUnitMoveAndAttack(e,2,"bottom", 2, checkArray[17])}
                }
            }
            if(!(checkArray[5] === 5)&& e.energy > 1){
                if(checkArray[5].align === "blue" && checkArray[4] === 4){
                    aiUnitMoveAndAttack(e,2,"right", 2, checkArray[5])
                }
            }
            
            if(!(checkArray[8] === 8) && e.energy > 1){
                if(checkArray[8].align === "blue" ){
                    if(checkArray[8].direction === "bottom" && checkArray[7] === 7){
                        aiUnitMoveAndAttack(e,-9,"right", 2, checkArray[8])
                    }
                    else if(checkArray[4] === 4) aiUnitMoveAndAttack(e, 2,"top", 2, checkArray[8])

                }
            }
            if(!(checkArray[12] === 12) && e.energy > 1){
                if(checkArray[12].align === "blue"){
                    if(checkArray[12].direction === "bottom" && checkArray[11] === 11){
                        aiUnitMoveAndAttack(e, -20 ,"right", 2, checkArray[12])
                    }
                    else if(checkArray[7] === 7){ aiUnitMoveAndAttack(e, -9,"top", 2, checkArray[12])}
                }
            }

            if(e.tile > 2 && (parseInt(e.tile.toString().split('')[1])) > 2 && !(tileArray[e.tile-2].unit) && e.energy === 2 && e.attacked == false){
                tileArray[e.tile].unit = null
                tileArray[e.tile-2].unit = aiUnitArray[e.position]
                aiUnitArray[e.position].tile -= 2
            }
        }
    )

    
    playerTurnChangeOver()
}