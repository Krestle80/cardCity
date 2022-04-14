let aiUnitMoveAndAttack = (unit, differenceOfTile, direction, energyCost, target ) =>{
    console.log(unit, "line three bug")
    tileArray[unit.tile].unit = null
    tileArray[unit.tile + differenceOfTile].unit = aiUnitArray[unit.position]
    console.log(aiUnitArray[unit.position])
    aiUnitArray[unit.position].tile += differenceOfTile
    unit.energy -= energyCost 
    unit.direction = direction
    if(unit.attacked === false){
        Unit.prototype.attack.call(unit, target)
    }
}
