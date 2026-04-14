let delay = [];
let timeToWait = [];

let active;
let editMode;
let pumps = 3;

let timesPumped = [
    parseInt(localStorage.getItem("timesPumped1")) || 0,
    parseInt(localStorage.getItem("timesPumped2")) || 0,
    parseInt(localStorage.getItem("timesPumped3")) || 0
];

let dayDisplay = [document.getElementById("dayDisplay1"), document.getElementById("dayDisplay2"), document.getElementById("dayDisplay3")];
let delayDisplay = [document.getElementById("delayDisplay1"), document.getElementById("delayDisplay2"), document.getElementById("delayDisplay3")];

let revertBtn = document.getElementById('revert');
let editBtn = document.getElementById("edit");
let processSite = document.getElementById("progressSite");
let processBtn = document.getElementById("process");
let processDisplay = document.getElementById("currentlyDoingAnything");

let pumpBtn = [document.getElementById("pump1"), document.getElementById("pump2"), document.getElementById("pump3")];
let pumpNoCtrBtn = [document.getElementById("pump1NoCTR"), document.getElementById("pump2NoCTR"), document.getElementById("pump3NoCTR")];
let increaseDelayBtn = [document.getElementById("increaseSecPump1"), document.getElementById("increaseSecPump2"), document.getElementById("increaseSecPump3")];
let decreaseDelayBtn = [document.getElementById("decreaseSecPump1"), document.getElementById("decreaseSecPump2"), document.getElementById("decreaseSecPump3")];
let increaseTimeBtn = [document.getElementById("increaseDaysPump1"), document.getElementById("increaseDaysPump2"), document.getElementById("increaseDaysPump3")];
let decreaseTimeBtn = [document.getElementById("decreaseDaysPump1"), document.getElementById("decreaseDaysPump2"), document.getElementById("decreaseDaysPump3")];

//litteral text
let increaseDelayText = "increase by 0.1 seconds";
let decreaseDelayText = "decrease by 0.1 seconds";
let increaseTimeText = "increase by 1 Day";
let decreaseTimeText = "decrease by 1 Day";
let revertText = "Revert Editing";

function init() {
    //darkmode/lightmode
    document.getElementById("lightSwitch").addEventListener("click", () => { darkmodeButton(); });
    setColorTheme();

    //pump stats
    getAllPumpSettings();
    fetchPumps();

    //process starten/stoppen
    getRunningStatus();
    fetchProcess();

    //editmode
    editSettingsModeCheck();
    if (editBtn != null) editBtn.addEventListener("click", () => { activateOrDeactivateEditMode();});
    if (revertBtn != null) revertBtn.addEventListener("click", () => {if (editMode) revertSettings();});
    
    //zeit button zeigs
    fetchSec();
    fetchDays();

    //stats displayen
    displayStats();
}

function fetchPumps() {
    if (pumpBtn[0] != null) pumpBtn[0].addEventListener("click", () => { if (!editMode && active) { pump(1); displayStats(); } });
    if (pumpNoCtrBtn[0] != null) pumpNoCtrBtn[0].addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(1); displayStats(); } });
    if (pumpBtn[1] != null) pumpBtn[1].addEventListener("click", () => { if (!editMode && active) { pump(2); displayStats(); } });
    if (pumpNoCtrBtn[1] != null) pumpNoCtrBtn[1].addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(2); displayStats(); } });
    if (pumpBtn[2] != null) pumpBtn[2].addEventListener("click", () => { if (!editMode && active) { pump(3); displayStats(); } });
    if (pumpNoCtrBtn[2] != null) pumpNoCtrBtn[2].addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(3); displayStats(); } });
}

function fetchProcess() {
    if (processBtn != null && processDisplay != null && processSite != null) {
        if (active) {
            processDisplay.innerText = "Das System ist momentan ACTIV und bewässert Pflanzen wie geplant.";
            processBtn.innerHTML = "Click to DEACTIVATE";
            processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
        } else {
            processDisplay.innerText = "Das System ist momentan INACTIV und bewässert keine Pflanzen.";
            processBtn.innerHTML = "Click to ACTIVATE";
            processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
        }
        processSite.addEventListener("click", () => { activateOrDeactivateProcess(); sendRunningStatusToAllPumps(); });
        processBtn.addEventListener("click", () => { activateOrDeactivateProcess(); sendRunningStatusToAllPumps(); });
    }
}

async function pump(number) {
    await getAllPumpSettings();
    await fetch('/usePump' + number);
    sleep(delay[number-1]);
    timesPumped[number-1]++;
    localStorage.setItem("timesPumped" + number, timesPumped[number-1]);
    console.log("PUMPED!!!");
}

async function pumpWithoutCounterReset(number) {
    await getAllPumpSettings();
    await fetch('/usePumpNoCtr' + number);
    sleep(delay[number-1]);
    console.log("PUMPED!!!");
}

async function getAllPumpSettings() {
    for (let pump = 0; pump < pumps; pump++) {
        await fetch(`/getPump?pump=${pump}`)
            .then(r => r.json())
            .then(j => {
                console.log('fetched' + pump, j);
                timeToWait[pump] = parseInt(j.days);
                delay[pump] = parseInt(j.interval);
            })
            .then(() => { displayStats(); })
            .catch(e => console.error('fetch failed', e));
    }
}

async function sendPumpSettings(pump, days, intervalMs) {
    let fetcherStr = `/setPump?pump=${pump}&days=${encodeURIComponent(days)}&interval=${encodeURIComponent(intervalMs)}`;
    await fetch(fetcherStr)
        .then(r => r.json())
        .then(j => console.log('saved', j))
        .catch(e => console.error('save failed', e));
}

function fetchSec() {
    for (let i = 0; i < pumps; i++) {
        if (delay[i] == null) {
            delay[i] = 1000;
        }
    }

    for (let i = 0; i < pumps; i++) {
        if (increaseDelayBtn[i] != null) increaseDelayBtn[i].addEventListener("click", () => { 
            if (editMode) { 
                delay[i] /= 100;
                delay[i] ++;
                delay[i] *= 100;
            };
            displayStats(); 
        });
        if (decreaseDelayBtn[i] != null) decreaseDelayBtn[i].addEventListener("click", () => { 
            if (editMode) { 
                delay[i] /= 100;
                delay[i] --;
                delay[i] *= 100;
            }; 
            displayStats(); 
        });
    }
}

function fetchDays() {
    for (let i = 0; i < pumps; i++) {
        if (timeToWait[i] == null) {
            timeToWait[i] = 1;
        }
    }

    for (let i = 0; i < pumps; i++) {
        if (increaseTimeBtn[i] != null) increaseTimeBtn[i].addEventListener("click", () => { 
            if (editMode) { 
                timeToWait[i]++;
            }; 
            displayStats(); 
        });
        if (decreaseTimeBtn[i] != null) decreaseTimeBtn[i].addEventListener("click", () => { 
            if (editMode) { 
                timeToWait[i]--;
            }; 
            displayStats(); 
        });
    }
}

async function sendRunningStatusToAllPumps() {
    await fetch(`/setRunningStatus?running=${encodeURIComponent(active ? "1" : "0")}`);
}

async function getRunningStatus() {
    await fetch(`/getRunningStatus`)
        .then(r => r.json())
        .then(j => {
            console.log('fetched running status', j);
            active = j.running === "1" ? true : false;
        }
        )
        .then(() => { fetchProcess(); })
        .catch(e => console.error('fetch failed', e));
}

function displayStats() {
    let latestPumpingDisplay = [document.getElementById("latestPumping1"), document.getElementById("latestPumping2"), document.getElementById("latestPumping3")];

    let timesPumpedDisplay = [document.getElementById("displayAmountPumped1"), document.getElementById("displayAmountPumped2"), document.getElementById("displayAmountPumped3")];

    if (delayDisplay[0] != null) delayDisplay[0].innerHTML = delay[0];
    if (dayDisplay[0] != null) dayDisplay[0].innerHTML = timeToWait[0];

    if (delayDisplay[1] != null) delayDisplay[1].innerHTML = delay[1];
    if (dayDisplay[1] != null) dayDisplay[1].innerHTML = timeToWait[1];

    if (delayDisplay[2] != null) delayDisplay[2].innerHTML = delay[2];
    if (dayDisplay[2] != null) dayDisplay[2].innerHTML = timeToWait[2];

    if (timesPumpedDisplay[0] != null) timesPumpedDisplay[0].innerHTML = timesPumped[0];
    if (timesPumpedDisplay[1] != null) timesPumpedDisplay[1].innerHTML = timesPumped[1];
    if (timesPumpedDisplay[2] != null) timesPumpedDisplay[2].innerHTML = timesPumped[2];
}

function darkmodeButton() {
    if (localStorage.getItem("lightSwitch") == "0") {
        localStorage.setItem("lightSwitch", "1");
    } /*else if (localStorage.getItem("lightSwitch") == "1") {
        localStorage.setItem("lightSwitch", "2");
    } else if (localStorage.getItem("lightSwitch") == "2") {
        localStorage.setItem("lightSwitch", "3");
    } */else {
        localStorage.setItem("lightSwitch", "0");
    }
    setColorTheme();
}

function setColorTheme() {
    if (localStorage.getItem("lightSwitch") == "0") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/classic/classicLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/classic/classicDark.css');
    } else if (localStorage.getItem("lightSwitch") == "1") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/classic/classicLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/classic/classicBright.css');
    } /*else if (localStorage.getItem("lightSwitch") == "2") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/modern/modernLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/modern/modernDark.css');
    } else if (localStorage.getItem("lightSwitch") == "3") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/modern/modernLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/modern/modernBright.css');
    }*/
}

function activateOrDeactivateEditMode() {
    let temp = localStorage.getItem("editMode");
    if (localStorage.getItem("editMode") == "on") {
        localStorage.setItem("editMode", "off");
    } else {
        localStorage.setItem("editMode", "on");
        saveSettingsBeforeEditing();
    }

    if (temp == "on" && localStorage.getItem("editMode") != temp) {
        saveAndSendAllPumpSettings();
    }

    editSettingsModeCheck();
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function editSettingsModeCheck() {
    if (localStorage.getItem("editMode") == "on" && editBtn != null) {
        activateButtons();
        editBtn.setAttribute("class", "activeSiteButton");
        editMode = true; //Wenn !editmode und active darf er Pumpen, sonst nicht
        editBtn.innerHTML = "Save Settings";
    } else {
        if (editBtn != null) {
            deactivateButtons();
            editBtn.setAttribute("class", "siteButton");
            editMode = false;
            editBtn.innerHTML = "Enter Edit Mode";
        }
    }
}

function saveAndSendAllPumpSettings() {
    for (let i = 0; i < pumps; i++) {
        sendPumpSettings(i+1, timeToWait[i], delay[i]);
    }
}

function activateOrDeactivateProcess() {
    active = !active;
    if (processBtn != null && processDisplay != null && processSite != null) {
        if (active) {
            processDisplay.innerText = "Das System ist momentan ACTIV.";
            processBtn.innerHTML = "Click to DEACTIVATE";
            processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
        } else {
            processDisplay.innerText = "Das System ist momentan INACTIV.";
            processBtn.innerHTML = "Click to ACTIVATE";
            processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
        }
    }
}

function deactivateButtons() {
    if (revertBtn != null) revertBtn.setAttribute("class", "inactiveSiteButton");
    if (increaseDelayBtn[0] != null) increaseDelayBtn[0].setAttribute("class", "inactiveIncreaseSec");
    if (increaseDelayBtn[1] != null) increaseDelayBtn[1].setAttribute("class", "inactiveIncreaseSec");
    if (increaseDelayBtn[2] != null) increaseDelayBtn[2].setAttribute("class", "inactiveIncreaseSec");
    if (decreaseDelayBtn[0] != null) decreaseDelayBtn[0].setAttribute("class", "inactiveDecreaseSec");
    if (decreaseDelayBtn[1] != null) decreaseDelayBtn[1].setAttribute("class", "inactiveDecreaseSec");
    if (decreaseDelayBtn[2] != null) decreaseDelayBtn[2].setAttribute("class", "inactiveDecreaseSec");

    if (increaseTimeBtn[0] != null) increaseTimeBtn[0].setAttribute("class", "inactiveIncreaseDays");
    if (increaseTimeBtn[1] != null) increaseTimeBtn[1].setAttribute("class", "inactiveIncreaseDays");
    if (increaseTimeBtn[2] != null) increaseTimeBtn[2].setAttribute("class", "inactiveIncreaseDays");
    if (decreaseTimeBtn[0] != null) decreaseTimeBtn[0].setAttribute("class", "inactiveDecreaseDays");
    if (decreaseTimeBtn[1] != null) decreaseTimeBtn[1].setAttribute("class", "inactiveDecreaseDays");
    if (decreaseTimeBtn[2] != null) decreaseTimeBtn[2].setAttribute("class", "inactiveDecreaseDays");
    lockButtons();
}

function lockButtons() {
    if (revertBtn != null) revertBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + revertBtn.innerHTML;
    if (increaseDelayBtn[0] != null) increaseDelayBtn[0].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn[0].innerHTML;
    if (increaseDelayBtn[1] != null) increaseDelayBtn[1].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn[1].innerHTML;
    if (increaseDelayBtn[2] != null) increaseDelayBtn[2].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn[2].innerHTML;
    if (decreaseDelayBtn[0] != null) decreaseDelayBtn[0].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn[0].innerHTML;
    if (decreaseDelayBtn[1] != null) decreaseDelayBtn[1].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn[1].innerHTML;
    if (decreaseDelayBtn[2] != null) decreaseDelayBtn[2].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn[2].innerHTML;

    if (increaseTimeBtn[0] != null) increaseTimeBtn[0].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn[0].innerHTML;
    if (increaseTimeBtn[1] != null) increaseTimeBtn[1].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn[1].innerHTML;
    if (increaseTimeBtn[2] != null) increaseTimeBtn[2].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn[2].innerHTML;
    if (decreaseTimeBtn[0] != null) decreaseTimeBtn[0].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn[0].innerHTML;
    if (decreaseTimeBtn[1] != null) decreaseTimeBtn[1].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn[1].innerHTML;
    if (decreaseTimeBtn[2] != null) decreaseTimeBtn[2].innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn[2].innerHTML;
}

function unlockButtons() {
    if (revertBtn != null) revertBtn.innerHTML = revertText;
    if (increaseDelayBtn[0] != null) increaseDelayBtn[0].innerHTML = increaseDelayText;
    if (increaseDelayBtn[1] != null) increaseDelayBtn[1].innerHTML = increaseDelayText;
    if (increaseDelayBtn[2] != null) increaseDelayBtn[2].innerHTML = increaseDelayText;
    if (decreaseDelayBtn[0] != null) decreaseDelayBtn[0].innerHTML = decreaseDelayText;
    if (decreaseDelayBtn[1] != null) decreaseDelayBtn[1].innerHTML = decreaseDelayText;
    if (decreaseDelayBtn[2] != null) decreaseDelayBtn[2].innerHTML = decreaseDelayText;

    if (increaseTimeBtn[0] != null) increaseTimeBtn[0].innerHTML = increaseTimeText;
    if (increaseTimeBtn[1] != null) increaseTimeBtn[1].innerHTML = increaseTimeText;
    if (increaseTimeBtn[2] != null) increaseTimeBtn[2].innerHTML = increaseTimeText;
    if (decreaseTimeBtn[0] != null) decreaseTimeBtn[0].innerHTML = decreaseTimeText;
    if (decreaseTimeBtn[1] != null) decreaseTimeBtn[1].innerHTML = decreaseTimeText;
    if (decreaseTimeBtn[2] != null) decreaseTimeBtn[2].innerHTML = decreaseTimeText;
}

function activateButtons() {
    if (revertBtn != null) revertBtn.setAttribute("class", "siteButton");
    if (increaseDelayBtn[0] != null) increaseDelayBtn[0].setAttribute("class", "activeIncreaseSec");
    if (increaseDelayBtn[1] != null) increaseDelayBtn[1].setAttribute("class", "activeIncreaseSec");
    if (increaseDelayBtn[2] != null) increaseDelayBtn[2].setAttribute("class", "activeIncreaseSec");
    if (decreaseDelayBtn[0] != null) decreaseDelayBtn[0].setAttribute("class", "activeDecreaseSec");
    if (decreaseDelayBtn[1] != null) decreaseDelayBtn[1].setAttribute("class", "activeDecreaseSec");
    if (decreaseDelayBtn[2] != null) decreaseDelayBtn[2].setAttribute("class", "activeDecreaseSec");

    if (increaseTimeBtn[0] != null) increaseTimeBtn[0].setAttribute("class", "activeIncreaseDays");
    if (increaseTimeBtn[1] != null) increaseTimeBtn[1].setAttribute("class", "activeIncreaseDays");
    if (increaseTimeBtn[2] != null) increaseTimeBtn[2].setAttribute("class", "activeIncreaseDays");
    if (decreaseTimeBtn[0] != null) decreaseTimeBtn[0].setAttribute("class", "activeDecreaseDays");
    if (decreaseTimeBtn[1] != null) decreaseTimeBtn[1].setAttribute("class", "activeDecreaseDays");
    if (decreaseTimeBtn[2] != null) decreaseTimeBtn[2].setAttribute("class", "activeDecreaseDays");
    unlockButtons();
}

function saveSettingsBeforeEditing() {
    //alles wos ma editen kann saven

    localStorage.setItem("delayBackup1", delay[0] + "");
    localStorage.setItem("delayBackup2", delay[1] + "");
    localStorage.setItem("delayBackup3", delay[2] + "");
    localStorage.setItem("timeToWaitBackup1", timeToWait[0] + "");
    localStorage.setItem("timeToWaitBackup2", timeToWait[1] + "");
    localStorage.setItem("timeToWaitBackup3", timeToWait[2] + "");
}

function revertSettings() {
    //alles wiederrufen

    delay[0] = localStorage.getItem("delayBackup1");
    delay[1] = localStorage.getItem("delayBackup2");
    delay[2] = localStorage.getItem("delayBackup3");
    timeToWait[0] = localStorage.getItem("timeToWaitBackup1");
    timeToWait[1] = localStorage.getItem("timeToWaitBackup2");
    timeToWait[2] = localStorage.getItem("timeToWaitBackup3");

    //rendern
    displayStats();
}
init();