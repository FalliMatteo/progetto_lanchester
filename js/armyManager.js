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
        let num = battle.blueArmy.power * battle.blueArmy.size;
        for(let j = 0; j < Math.floor(num/2)+1; j++){
            await sleep(1000/num);
            if(battle.stop){
                return;
            }else{
                console.log(battle.stop)
                if(array.length <= 0){
                    break;
                }else{
                    battle.redArmy.size--;
                    const random = Math.floor(Math.random() * array.length);
                    let id = array[random];
                    array.splice(random, 1);
                    self.postMessage({method: 1, num: id});
                }
            }
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
        let num = battle.redArmy.power * battle.redArmy.size;
        for(let j = 0; j < Math.floor(num/2)+1; j++){
            await sleep(1000/num);
            if(battle.stop){
                return;
            }else{
                console.log(battle.stop)
                if(array.length <= 0){
                    break;
                }else{
                    battle.blueArmy.size--;
                    const random = Math.floor(Math.random() * array.length);
                    let id = array[random];
                    array.splice(random, 1);
                    self.postMessage({method: 1, num: id});
                }
            }
        }
    }
    battle.stop = true;
    self.postMessage({method: 2});
}