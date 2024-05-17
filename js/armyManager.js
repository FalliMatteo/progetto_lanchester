self.onmessage = function(event) {
    let document = event.data.document;
    let army = event.data.army;
    let battle = event.data.battle;
    if(army == "red"){
        redManagement(document, battle);
    }else{
        blueManagement(document, battle);
    }
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

function redManagement(document, battle) {
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

function blueManagement(document, battle) {
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