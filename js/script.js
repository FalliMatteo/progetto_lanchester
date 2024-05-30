const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const redManager = new Worker("../js/armyManager.js");
const blueManager = new Worker("../js/armyManager.js");
const buffer = new SharedArrayBuffer(8);
const battle = new Int8Array(buffer);

async function simulateBattle(blueArmySize, blueArmyPower, redArmySize, redArmyPower) {
    battle[0] = blueArmySize;
    battle[1] = redArmySize;
    battle[2] = 1;
    await sleep(1000);
    console.log("START");
    redManager.postMessage({army: "red", buffer: buffer, power: blueArmyPower});
    blueManager.postMessage({army: "blue", buffer: buffer, power: redArmyPower});
}

redManager.onmessage = function(event) {
    let method = event.data.method;
    let num;
    let id;
    switch(method){
        case 1:
            num = event.data.num;
            console.log("Red troop " + num + " has been killed (Remaining troops: " + battle[1] + ")");
            id = "troop-" + num + "-red";
            document.getElementById(id).classList.add("killed");
            break;
        case 2:
            console.log("BLUE WIN");
            document.getElementById("result").innerHTML = "Blue win (Remaining troops: " + battle[0] + ")";
            document.getElementById("result").classList.add("blue");
            document.getElementById("battle-button").classList.remove("killed");
            break;
        default:
            console.log("This is not OK...");
    }
}

blueManager.onmessage = function(event) {
    let method = event.data.method;
    let num;
    let id;
    switch(method){
        case 1:
            num = event.data.num;
            console.log("Blue troop " + num + " has been killed (Remaining troops: " + battle[0] + ")");
            id = "troop-" + num + "-blue";
            document.getElementById(id).classList.add("killed");
            break;
        case 2:
            console.log("RED WIN");
            document.getElementById("result").innerHTML = "Red win (Remaining troops: " + battle[1] + ")";
            document.getElementById("result").classList.add("red");
            document.getElementById("battle-button").classList.remove("killed");
            break;
        default:
            console.log("This is not OK...");
    }
}