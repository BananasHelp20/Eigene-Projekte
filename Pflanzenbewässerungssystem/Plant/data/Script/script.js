let duration1 = 1000;
let editmode = false;

function init() {
    document.getElementById("pump1").addEventListener("click", () => {
        pump(1, duration1, true);
    });

    document.getElementById("pumpNoCtr1").addEventListener("click", () => {
        pump(1, duration1, false);
    });

    document.getElementById("increaseSeconds1").addEventListener("click", () => {
        if (getEditMode()) changeDuration(1, 1000);
    });

    document.getElementById("decreaseSeconds1").addEventListener("click", () => {
        if (getEditMode()) changeDuration(1, -1000);
    });

    document.getElementById("increaseDays1").addEventListener("click", () => {
        if (getEditMode()) changeInterval(1, 1);
    });

    document.getElementById("decreaseDays1").addEventListener("click", () => {
        if (getEditMode()) changeInterval(1, -1);
    });

    document.getElementById("edit").addEventListener("click", (event) => {
        editmode = !editmode;
        if (!editmode) {
            event.target.innerText = "Edit Settings";
        } else {
            event.target.innerText = "Save Settings";
        }
        setEditMode(editmode);
    })
}

function pump(pumpNumber, duration, resetCounter) {
    if (resetCounter) {
        sendPumpSignal(pumpNumber, duration);
    } else {
        sendPumpSignalWithoutCounterChange(pumpNumber, duration);
    }
}

function changeDuration(pumpNumber, durationChange) { //duration wird lokal gespeichert, falls auf "pump" gedrückt wird, ohne das des async signal ausgetauscht worden is, und dann de alte duration genommen wird
    duration1 += durationChange;
    setNewDuration(pumpNumber, duration1);
}

function changeInterval(pumpNumber, intervalChange) { //beim intervall wird eh imma vom server aus gepumpt, do bringts ma nix wenn i des im Frontend speichere.
    setNewInterval(pumpNumber, intervalChange);
}

function getEditMode() { //momentan nu de propertie, oba könnte a gesendet werden und so shit.
    return editmode;
}

function setEditMode(edit) {
    editmode = edit;
    // sendEditMode(edit);
}