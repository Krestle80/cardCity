let checkUnitsThree = (unit) => {
    console.log(unit)
    //sets an array to stuff the nearby units into 
    let checkArray = []
    //checks in left X
    if(!(unit.tile === 0 || unit.tile.toString().split('')[1] === 0)){
        if((tileArray[unit.tile - 1].unit)){
            checkArray.push(tileArray[unit.tile - 1].unit)
        }
        else if(tileArray[unit.tile - 1].building){
            checkArray.push(tileArray[unit.tile - 1].building)
        }
        else checkArray.push(0)
        if(!(parseInt(unit.tile.toString().split('')[1] <= 1) || unit.tile <= 1)){
            if((tileArray[unit.tile - 2].unit)){
                checkArray.push(tileArray[unit.tile - 2].unit)
            }
            else if(tileArray[unit.tile - 2].building){
                checkArray.push(tileArray[unit.tile - 2].building)
            }
            else checkArray.push(1)
            if(!(parseInt(unit.tile.toString().split('')[1]) <= 2|| unit.tile <= 2)){
                if( tileArray[unit.tile - 3].unit){
                    checkArray.push(tileArray[unit.tile - 3].unit)
                }
                else if(tileArray[unit.tile - 3].building){
                    checkArray.push(tileArray[unit.tile - 3].building)
                }
                else checkArray.push(2)
            }
            else checkArray.push(2)
        }
        else{
            checkArray.push(1)
            checkArray.push(2)
        }
    }
    else {
        checkArray.push(0)
        checkArray.push(1)
        checkArray.push(2)
    }
    //checks in right x
    if(!(unit.tile === 9 || unit.tile.toString().split('')[1] === 9)){
        if((tileArray[unit.tile + 1].unit)){
            checkArray.push(tileArray[unit.tile + 1].unit)
        }
        else if(tileArray[unit.tile + 1].building){
            checkArray.push(tileArray[unit.tile + 1].building)
        }
        else checkArray.push(3)
        if(!(parseInt(unit.tile.toString().split('')[1]) >= 8)){
            if((tileArray[unit.tile + 2].unit)){
                checkArray.push(tileArray[unit.tile + 2].unit)
            }
            else if(tileArray[unit.tile + 2].building){
                checkArray.push(tileArray[unit.tile + 2].building)
            }
            else checkArray.push(4)
            if(!(parseInt(unit.tile.toString().split('')[1]) >= 7)){

                if((tileArray[unit.tile + 3].unit)){
                    checkArray.push(tileArray[unit.tile + 3].unit)
                }
                else if(tileArray[unit.tile + 3].building){
                    checkArray.push(tileArray[unit.tile + 3].building)
                }
                else checkArray.push(5)
            }

        } 
        else{
            checkArray.push(4)
            checkArray.push(5)
        }

    }
    else {
        checkArray.push(3)
        checkArray.push(4)
        checkArray.push(5)
    }
    // checks in top y
    if(unit.tile >= 9){
        if((tileArray[unit.tile - 10].unit)){
            checkArray.push(tileArray[unit.tile - 10].unit)
        }
        else if(tileArray[unit.tile - 10].building){
            checkArray.push(tileArray[unit.tile - 10].building)
        }
        else checkArray.push(6)
        if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
            // checks top right diagnal 1
            if((tileArray[unit.tile - 9].unit)){
                checkArray.push(tileArray[unit.tile - 9].unit)
            }
            else if(tileArray[unit.tile - 9].building){
                checkArray.push(tileArray[unit.tile - 9].building)
            }
            else checkArray.push(7)
            if(!(unit.tile === 8 || unit.tile === 9 || parseInt(unit.tile.toString().split('')[1])  >= 8)){
                // checks top right diagnal 2 b
                if(tileArray[unit.tile - 8].unit){
                    checkArray.push(tileArray[unit.tile - 8].unit)
                }
                else if(tileArray[unit.tile - 8].building){
                    checkArray.push(tileArray[unit.tile - 8].building)
                }
                else checkArray.push(8)
            }
            else checkArray.push(8)
        }
        else {
            checkArray.push(7)
            checkArray.push(8)
        }
        if(!(unit.tile <=9 || parseInt(unit.tile.toString().split('')[0]) === 0)){

            //checks top left diagnal 1
            if((tileArray[unit.tile - 11].unit)){
                checkArray.push(tileArray[unit.tile - 11].unit)
            }   
            else if(tileArray[unit.tile - 11].building){
                checkArray.push(tileArray[unit.tile - 11].building)
            }
            else checkArray.push(9)
            //checks top left diagnal 2 b, letter labels are from top down
            if(!(unit.tile <= 2 || parseInt(unit.tile.toString().split('')[1]) <= 2 || unit.tile ===11)){
                console.log(unit.tile.toString().split('')[1])
                if(tileArray[unit.tile - 12].unit){
                    checkArray.push(tileArray[unit.tile - 12].unit)
                }
                else if ((tileArray[unit.tile - 12].building)){
                    checkArray.push(tileArray[unit.tile - 12].building)
                }
                else checkArray.push(10)
            }
            else checkArray.push(10)
        }
        else {
            checkArray.push(9)
            checkArray.push(10)
        }
        if(unit.tile >= 20){
            if((tileArray[unit.tile - 20].unit)){
                checkArray.push(tileArray[unit.tile - 20].unit)
            }
            else if(tileArray[unit.tile - 20].building){
                checkArray.push(tileArray[unit.tile - 20].building)
            }
            else {
                checkArray.push(11)
            }
            //checks top right dianal 2 a 
            if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9) && (tileArray[unit.tile - 19].unit)){
                    checkArray.push(tileArray[unit.tile - 19].unit)
            }
            else if(tileArray[unit.tile - 19].building){
                checkArray.push(tileArray[unit.tile - 19].building)
            }
            else checkArray.push(12)
            //checks top left diagnal 2 a
            if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0) && (tileArray[unit.tile - 21].unit)){
                    checkArray.push(tileArray[unit.tile - 21].unit)
            }
            else if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0) && tileArray[unit.tile - 21].building){
                checkArray.push(tileArray[unit.tile - 21].building)
            }
            else checkArray.push(13)
            if(unit.tile >= 30){
                if((tileArray[unit.tile - 30].unit)){
                    checkArray.push(tileArray[unit.tile - 30].unit)
                }
                else if(tileArray[unit.tile - 30].building){
                    checkArray.push(tileArray[unit.tile - 30].building)
                }
                else checkArray.push(14)

            }
            else checkArray.push(14) 
        }
        else {
            checkArray.push(11)
            checkArray.push(12)
            checkArray.push(13)
            checkArray.push(14)
        }
    }
    else {
        checkArray.push(6)
        checkArray.push(7)
        checkArray.push(8)
        checkArray.push(9)
        checkArray.push(10)
        checkArray.push(11)
        checkArray.push(12)
        checkArray.push(13)
        checkArray.push(14)
    }
    //checks in bottom y
    if(unit.tile <= 49){
        if((tileArray[unit.tile + 10].unit)){
            checkArray.push(tileArray[unit.tile + 10].unit)
        }        
        else if(tileArray[unit.tile + 10].building){
            checkArray.push(tileArray[unit.tile + 10].building)
        }
        else checkArray.push(15)
            if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
                // checks bottom right diagnal 1
                if((tileArray[unit.tile + 11].unit)){
                    checkArray.push(tileArray[unit.tile + 11].unit)
                }
                else if(tileArray[unit.tile + 11].building){
                    checkArray.push(tileArray[unit.tile + 11].building)
                }
                else checkArray.push(16)
                if(!(unit.tile === 8 || parseInt(unit.tile.toString().split('')[1])  >= 8)){
                    // checks bottom right diagnal 2 a
                    if((tileArray[unit.tile + 12].unit)){
                        checkArray.push(tileArray[unit.tile + 12].unit)
                    }
                    else if(tileArray[unit.tile + 12].building){
                        checkArray.push(tileArray[unit.tile + 12].building)
                    }
                    else checkArray.push(17)
                }
            }
            else{
                checkArray.push(16)
                checkArray.push(17)
            }
            if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0)){
    
                //checks bottom left diagnal 1
                if((tileArray[unit.tile + 9].unit)){
                    checkArray.push(tileArray[unit.tile + 9].unit)
                }  
                else if(tileArray[unit.tile + 9].building){
                    checkArray.push(tileArray[unit.tile + 9].building)
                } 
                else checkArray.push(18)
                //checks bottom left diagnal 2 a
                if((!(unit.tile === 1 || parseInt(unit.tile.toString().split('')[1] <= 1)) && (tileArray[unit.tile + 8].unit))){
                        checkArray.push(tileArray[unit.tile + 8].unit)
                }
                else if(tileArray[unit.tile + 8].building){
                    checkArray.push(tileArray[unit.tile + 8].building)
                }
                else checkArray.push(19)
            }
            else{
                checkArray.push(18)
                checkArray.push(19)
            }

            if(unit.tile <= 39){
                if((tileArray[unit.tile + 20].unit)){
                    checkArray.push(tileArray[unit.tile + 20].unit)
                }
                else if(tileArray[unit.tile + 20].building){
                    checkArray.push(tileArray[unit.tile + 20].building)
                }
                else checkArray.push(20)
                //checks bottom right dianal 2 b 
                if(!(unit.tile === 9 || parseInt(unit.tile.toString().split('')[1]) === 9)){
                    if((tileArray[unit.tile + 21].unit)){
                        checkArray.push(tileArray[unit.tile + 21].unit)
                    }
                    else if(tileArray[unit.tile + 21].building){
                        checkArray.push(tileArray[unit.tile + 21].building)
                    }
                    else checkArray.push(21)
                }
                if(!(unit.tile === 0 || parseInt(unit.tile.toString().split('')[1]) === 0)){
                    //checks bottom left diagnal 2 a
                    if((tileArray[unit.tile + 19].unit)){
                        checkArray.push(tileArray[unit.tile + 19].unit)
                    }
                    else if(tileArray[unit.tile + 19].building){
                        checkArray.push(tileArray[unit.tile + 19].building)
                    }
                    else checkArray.push(22)
                }
                else checkArray.push(22)
                
                if(unit.tile <= 29 && tileArray[unit.tile + 30].unit){
                        checkArray.push(tileArray[unit.tile + 30].unit)
                    }        
                    else if(unit.tile <= 29 && tileArray[unit.tile + 30].building){
                        checkArray.push(tileArray[unit.tile + 30].building)
                    }
                    else checkArray.push(23)
            }
            else {
                checkArray.push(20)
                checkArray.push(21)
                checkArray.push(22)
                checkArray.push(23)
            }
        
    }
    else {
        checkArray.push(15)
        checkArray.push(16)
        checkArray.push(17)
        checkArray.push(18)
        checkArray.push(19)
        checkArray.push(20)
        checkArray.push(21)
        checkArray.push(22)
        checkArray.push(23)
    }

        return checkArray
}