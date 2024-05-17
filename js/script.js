const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const redManager = new Worker("../js/armyManager.js");
const blueManager = new Worker("../js/armyManager.js");

async function simulateBattle(army1Size, army1Power, army2Size, army2Power) {
    let blueArmy = {size: army1Size, power: army1Power};
    let redArmy = {size: army2Size, power: army2Power};
    let battle = {redArmy: redArmy, blueArmy: blueArmy, stop: false};
    await sleep(1000);
    console.log("START");
    redManager.postMessage({army: "red", battle: battle});
    blueManager.postMessage({army: "blue", battle: battle});
}

redManager.onmessage = function(event) {
    let method = event.data.method;
    let num;
    let id;
    switch(method){
        case 1:
            num = event.data.num;
            console.log("Red troop " + num + " has been killed");
            id = "troop-" + num + "-red";
            document.getElementById(id).classList.add("killed");
            break;
        case 2:
            console.log("BLUE WIN");
            document.getElementById("result").innerHTML = "Blue win";
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
            console.log("Blue troop " + num + " has been killed");
            id = "troop-" + num + "-blue";
            document.getElementById(id).classList.add("killed");
            break;
        case 2:
            console.log("RED WIN");
            document.getElementById("result").innerHTML = "Red win";
            document.getElementById("result").classList.add("red");
            document.getElementById("battle-button").classList.remove("killed");
            break;
        default:
            console.log("This is not OK...");
    }
}