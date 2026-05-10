let durations = []; // Array for all 3 pumps
let editmode = true;

function init() {
    getPumpCount().then((count) => {
        //createPumps(count);
        initializePumps(count);
    });
    let pumpObjects;
    getData().then((data) => {
        pumpObjects = data;
        for (let i = 0; i < pumpObjects.length; i++) {
            durations.push(pumpObjects[i].duration);
        }

    });

    document.getElementById("edit")?.addEventListener("click", (event) => {
        editmode = !editmode;
        event.target.innerText = editmode ? "Save Settings" : "Edit Settings";
    });
}

function initializePumps(count) {
    for (let i = 1; i <= count; i++) {
        document.getElementById(`pump${i}`)?.addEventListener("click", () => {
            sendPumpSignal(i, durations[i - 1]);
        });

        document.getElementById(`pumpNoCtr${i}`)?.addEventListener("click", () => {
            sendPumpSignalWithoutCounterChange(i, durations[i - 1]);
        });

        document.getElementById(`increaseSeconds${i}`)?.addEventListener("click", () => {
            if (getEditMode()) changeDuration(i, 1000);
        });

        document.getElementById(`decreaseSeconds${i}`)?.addEventListener("click", () => {
            if (getEditMode()) changeDuration(i, -1000);
        });

        document.getElementById(`increaseDays${i}`)?.addEventListener("click", () => {
            if (getEditMode()) changeInterval(i, 1);
        });

        document.getElementById(`decreaseDays${i}`)?.addEventListener("click", () => {
            if (getEditMode()) changeInterval(i, -1);
        });
    }
}

function changeDuration(pumpNumber, durationChange) {
    durations[pumpNumber - 1] += durationChange;
    setNewDuration(pumpNumber, durations[pumpNumber - 1]);
}

function changeInterval(pumpNumber, intervalChange) {
    setNewInterval(pumpNumber, intervalChange);
}

function getEditMode() {
    return editmode;
}

init();
console.log("Script loaded");
