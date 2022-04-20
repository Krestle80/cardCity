let aiUnitMoveAndAttack = (unit, differenceOfTile, direction, energyCost, target ) =>{
    console.log(unit, target, differenceOfTile,  "line three bug")
    tileArray[unit.tile].unit = null
    tileArray[unit.tile + differenceOfTile].unit = unit
    console.log(aiUnitArray[unit.position])
    unit.tile += differenceOfTile
    unit.energy -= energyCost 
    unit.direction = direction
    if(unit.attacked === false){
        Unit.prototype.shoot.call(unit, target)
    }
}
