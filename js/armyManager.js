self.addEventListener("message", async (parameters)=>{
    let army = parameters.data.army;
    let battle = new Int8Array(parameters.data.buffer);
    let power = parameters.data.power;
    if(army == "red"){
        redManagement(battle, power);
    }else{
        blueManagement(battle, power);
    }
})

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function redManagement(battle, power) {
    const array = [];
    for(let i = 0 ; i < battle[1]; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = power * battle[0];
        await sleep(1000/num);
        if(battle[2] == 0){
            return;
        }else{
            battle[1]--;
            const random = Math.floor(Math.random() * array.length);
            let id = array[random];
            array.splice(random, 1);
            self.postMessage({method: 1, num: id});
        }
    }
    battle[2] = 0;
    self.postMessage({method: 2});
}

async function blueManagement(battle, power) {
    const array = [];
    for(let i = 0 ; i < battle[0]; i++){
        array[i] = i;
    }
    while(array.length > 0){
        let num = power * battle[1];
        await sleep(1000/num);
        if(battle[2] == 0){
            return;
        }else{
            battle[0]--;
            const random = Math.floor(Math.random() * array.length);
            let id = array[random];
            array.splice(random, 1);
            self.postMessage({method: 1, num: id});
        }
    }
    battle[2] = 0;
    self.postMessage({method: 2});
}