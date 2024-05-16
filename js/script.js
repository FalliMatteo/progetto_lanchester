function simulateBattle(army1Size, army1Power, army2Size, army2Power) {
    let blueArmy = {size: army1Size, power: army1Power};
    let redArmy = {size: army2Size, power: army2Power};
    let battle = {redArmy: redArmy, blueArmy: blueArmy, stop: false};
    setTimeout(3000);
    console.log("START");
    blueManagement(battle);
    redManagement(battle);
}

async function redManagement(battle){
    const array = [];
    for(let i = 0 ; i < battle.redArmy.size; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = battle.blueArmy.power * (battle.blueArmy.size ** 2);
        setTimeout(1000/num);
        if(battle.stop){
            break;
        }else{
            battle.redArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            array.splice(random, 1)[0];
            let id = "troop-" + random + "-red";
            document.getElementById(id).classList.add("killed");
            console.log("Red troop " + random + " has been killed");
        }
    }
    battle.stop = true;
    console.log("BLUE WIN");
    document.getElementById("result").innerHTML = "Vincono i Blu";
    document.getElementById("result").classList.add("blue");
}

async function blueManagement(battle){
    const array = [];
    for(let i = 0 ; i < battle.blueArmy.size; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = battle.redArmy.power * (battle.redArmy.size ** 2);
        setTimeout(1000/num);
        if(battle.stop){
            break;
        }else{
            battle.blueArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            array.splice(random, 1)[0];
            let id = "troop-" + random + "-blue";
            document.getElementById(id).classList.add("killed");
            console.log("Blue troop " + random + " has been killed");
        }
    }
    battle.stop = true;
    console.log("RED WIN");
    document.getElementById("result").innerHTML = "Vincono i Rossi";
    document.getElementById("result").classList.add("red");
    
}

