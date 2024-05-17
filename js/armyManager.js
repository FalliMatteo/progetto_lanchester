self.onmessage = function(event) {
    let army = event.data.army;
    let battle = event.data.battle;
    if(army == "red"){
        redManagement(battle);
    }else{
        blueManagement(battle);
    }
}

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function redManagement(battle) {
    const array = [];
    for(let i = 0 ; i < battle.redArmy.size; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = battle.blueArmy.power * (battle.blueArmy.size ** 2);
        await sleep(2000/num);
        console.log(battle.stop)
        if(battle.stop){
            return;
        }else{
            battle.redArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            let id = array[random];
            array.splice(random, 1);
            self.postMessage({method: 1, num: id});
        }
    }
    battle.stop = true;
    self.postMessage({method: 2});
}

async function blueManagement(battle) {
    const array = [];
    for(let i = 0 ; i < battle.blueArmy.size; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = battle.redArmy.power * (battle.redArmy.size ** 2);
        await sleep(2000/num);
        console.log(battle.stop)
        if(battle.stop){
            return;
        }else{
            battle.blueArmy.size--;
            const random = Math.floor(Math.random() * array.length);
            let id = array[random];
            array.splice(random, 1);
            self.postMessage({method: 1, num: id});
        }
    }
    battle.stop = true;
    self.postMessage({method: 2});
}