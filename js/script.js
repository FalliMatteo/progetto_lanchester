function simulateBattle(army1Size, army1Power, army2Size, army2Power) {

    var army1 = {size: army1Size, power: army1Power};
    var army2 = {size: army2Size, power: army2Power};

    var timeStep = 0.01; // Time step for the simulation
    var totalTime = 10; // Total time of the simulation
    var battleLog = document.getElementById("battle-log");

    for (var time = 0; time < totalTime; time += timeStep) {
        var casualties1 = army2.size * army2.power * timeStep;
        var casualties2 = army1.size * army1.power * timeStep;

        army1.size -= casualties1;
        army2.size -= casualties2;

        var logEntry = `Time: ${time.toFixed(2)} - Army 1: ${army1.size.toFixed(0)} - Army 2: ${army2.size.toFixed(0)}`;
        battleLog.innerHTML += logEntry + "<br>";

        if (army1.size <= 0 || army2.size <= 0) {
            break;
        }
    }

    if (army1.size > army2.size) {
        document.getElementById("results").innerHTML = "Army 1 wins!";
    } else {
        document.getElementById("results").innerHTML = "Army 2 wins!";
    }
}
