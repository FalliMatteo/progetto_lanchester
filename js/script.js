const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

function simulateBattle(army1Size, army1Power, army2Size, army2Power) {
    let blueArmy = {size: army1Size, power: army1Power};
    let redArmy = {size: army2Size, power: army2Power};
    let battle = {redArmy: redArmy, blueArmy: blueArmy, stop: false};
    const wait = async () => {await sleep(3000)};
    wait();
    console.log("START");
    //redManager = new Worker("../js/armyManager.js");
    //blueManager = new Worker("../js/armyManager.js");
    //redManager.postMessage({document: document, army: "red", battle: battle});
    //blueManager.postMessage({document: document, army: "blue", battle: battle});
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
        const wait = async () => {await sleep(1000/num)};
        wait();
        console.log(battle.stop)
        if(battle.stop){
            break;
        }else{
            battle.redArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            array.splice(random, 1);
            let id = "troop-" + random + "-red";
            document.getElementById(id).classList.add("killed");
            console.log("Red troop " + random + " has been killed");
        }
    }
    if(!battle.stop){
        battle.stop = true;
        console.log("BLUE WIN");
        document.getElementById("result").innerHTML = "Blue win";
        document.getElementById("result").classList.add("blue");
        document.getElementById("battle-button").classList.remove("killed");
    }
}

async function blueManagement(battle){
    const array = [];
    for(let i = 0 ; i < battle.blueArmy.size; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = battle.redArmy.power * (battle.redArmy.size ** 2);
        const wait = async () => {await sleep(1000/num)};
        wait();
        console.log(battle.stop)
        if(battle.stop){
            break;
        }else{
            battle.blueArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            array.splice(random, 1);
            let id = "troop-" + random + "-blue";
            document.getElementById(id).classList.add("killed");
            console.log("Blue troop " + random + " has been killed");
        }
    }
    if(!battle.stop){
        battle.stop = true;
        console.log("RED WIN");
        document.getElementById("result").innerHTML = "Red win";
        document.getElementById("result").classList.add("red");
        document.getElementById("battle-button").classList.remove("killed");
    }
}
