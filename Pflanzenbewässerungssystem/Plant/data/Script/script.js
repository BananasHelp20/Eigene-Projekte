let delay1 = localStorage.getItem("delay1");
let delay2 = localStorage.getItem("delay2");
let delay3 = localStorage.getItem("delay3");
let timeToWait1 = localStorage.getItem("timeToWait1");
let timeToWait2 = localStorage.getItem("timeToWait2");
let timeToWait3 = localStorage.getItem("timeToWait3");

let active;
let editMode;
let pumps = 3;

fetchAllPumpStats();
for (let i = 0; i < pumps; i++) {
    getPumpSettings(i + 1);
}

let timesPumped = [
    parseInt(localStorage.getItem("timesPumped1")) || 0,
    parseInt(localStorage.getItem("timesPumped2")) || 0,
    parseInt(localStorage.getItem("timesPumped3")) || 0
];

let dayDisplay1 = document.getElementById("dayDisplay1");
let dayDisplay2 = document.getElementById("dayDisplay2");
let dayDisplay3 = document.getElementById("dayDisplay3");
let delayDisplay1 = document.getElementById("delayDisplay1");
let delayDisplay2 = document.getElementById("delayDisplay2");
let delayDisplay3 = document.getElementById("delayDisplay3");

let revertBtn = document.getElementById('revert');
let editBtn = document.getElementById("edit");
let processSite = document.getElementById("progressSite");

let pumpBtn1 = document.getElementById("pump1");
let pumpBtn2 = document.getElementById("pump2");
let pumpBtn3 = document.getElementById("pump3");

let pumpNoCtrBtn1 = document.getElementById("pump1NoCTR");
let pumpNoCtrBtn2 = document.getElementById("pump2NoCTR");
let pumpNoCtrBtn3 = document.getElementById("pump3NoCTR");

let increaseDelayBtn1 = document.getElementById("increaseSecPump1");
let increaseDelayBtn2 = document.getElementById("increaseSecPump2");
let increaseDelayBtn3 = document.getElementById("increaseSecPump3");

let decreaseDelayBtn1 = document.getElementById("decreaseSecPump1");
let decreaseDelayBtn2 = document.getElementById("decreaseSecPump2");
let decreaseDelayBtn3 = document.getElementById("decreaseSecPump3");

let increaseTimeBtn1 = document.getElementById("increaseDaysPump1");
let increaseTimeBtn2 = document.getElementById("increaseDaysPump2");
let increaseTimeBtn3 = document.getElementById("increaseDaysPump3");

let decreaseTimeBtn1 = document.getElementById("decreaseDaysPump1");
let decreaseTimeBtn2 = document.getElementById("decreaseDaysPump2");
let decreaseTimeBtn3 = document.getElementById("decreaseDaysPump3");

let processBtn = document.getElementById("progress");
let smallProcessBtn = document.getElementById("smallProcessBtn");

/* JO I BIN SCHO DRAUF KEMA DAS ES ARRAYS GIBT, OBA MI HODS BIS JETZT ECHT NED GFREIT, DES OLLES UMZUSCHREIBEN, weils so fü is */

//litteral text
let increaseDelayText = "increase by 0.1 seconds";
let decreaseDelayText = "decrease by 0.1 seconds";
let increaseTimeText = "increase by 1 Day";
let decreaseTimeText = "decrease by 1 Day";
let revertText = "Revert Editing";

function init() {
    //darkmode/lightmode
    document.getElementById("lightSwitch").addEventListener("click", () => {darkmodeButton();});
    setColorTheme();
    fetchPumps();

    //process starten/stoppen
    fetchProcess();

    //edit mode an und aus
    editSettingsModeCheck();
    if (editBtn != null) editBtn.addEventListener("click", () => { activateOrDeactivateEditMode();});
    if (revertBtn != null) revertBtn.addEventListener("click", () => {if (editMode) revertSettings();});
    
    //zeit zeigs
    fetchSec();
    fetchDays();
    displayStats();
}

function fetchPumps() {
    if (pumpBtn1 != null) pumpBtn1.addEventListener("click", () => { if (!editMode && active) { pump(1); displayStats(); } });
    if (pumpNoCtrBtn1 != null) pumpNoCtrBtn1.addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(1); displayStats(); } });
    if (pumpBtn2 != null) pumpBtn2.addEventListener("click", () => { if (!editMode && active) { pump(2); displayStats(); } });
    if (pumpNoCtrBtn2 != null) pumpNoCtrBtn2.addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(2); displayStats(); } });
    if (pumpBtn3 != null) pumpBtn3.addEventListener("click", () => { if (!editMode && active) { pump(3); displayStats(); } });
    if (pumpNoCtrBtn3 != null) pumpNoCtrBtn3.addEventListener("click", () => { if (!editMode && active) { pumpWithoutCounterReset(3); displayStats(); } });
}


function fetchAllPumpStats() {
    delay1 = localStorage.getItem("delay1");
    delay2 = localStorage.getItem("delay2");
    delay3 = localStorage.getItem("delay3");
    timeToWait1 = localStorage.getItem("timeToWait1");
    timeToWait2 = localStorage.getItem("timeToWait2");
    timeToWait3 = localStorage.getItem("timeToWait3");
}

function fetchProcess() {
    if (localStorage.getItem("currentProgress") == "true") {
        active = true;
        if (processBtn != null) processBtn.innerHTML = "ACTIVE";
        if (processSite != null) processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
    } else {
        if (processBtn != null) processBtn.innerHTML = "INACTIVE";
        if (processSite != null) processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
        active = false;
    }
    if (processSite != null) processSite.addEventListener("click", () => { activateOrDeactivateProcess(); });
    if (processBtn != null) processBtn.addEventListener("click", () => { activateOrDeactivateProcess(); });
}

async function pump(number) {
    await fetch('/usePump' + number);
    sleep(localStorage.getItem("delay" + number));
    localStorage.setItem("timestamp" + number, new Date().getTime());
    timesPumped[number-1]++;
    localStorage.setItem("timesPumped" + number, timesPumped[number-1]);
    console.log("PUMPED!!!");
}

async function pumpWithoutCounterReset(number) {
    await fetch('/usePumpNoCtr' + number);
    sleep(localStorage.getItem("delay" + number));
    console.log("PUMPED!!!");
}

async function getPumpSettings(pump) {
    await fetch(`/getPump?pump=${pump}`)
        .then(r => r.json())
        .then(j => {
            console.log('fetched', j);
            localStorage.setItem("timeToWait" + pump, j.days + "");
            localStorage.setItem("delay" + pump, j.interval + "");
        })
        .then(() => fetchAllPumpStats())
        .then(() => init())
        .catch(e => console.error('fetch failed', e));
}

async function sendPumpSettings(pump, days, intervalMs) {
    let fetcherStr = `/setPump?pump=${pump}&days=${encodeURIComponent(days)}&interval=${encodeURIComponent(intervalMs)}`;
    await fetch(fetcherStr)
        .then(r => r.json())
        .then(j => console.log('saved', j))
        .catch(e => console.error('save failed', e));
}

function fetchSec() {
    if (delay1 == null) {
        delay1 = 0;
    }
    if (delay2 == null) {
        delay2 = 0;
    }
    if (delay3 == null) {
        delay3 = 0;
    }

    if (increaseDelayBtn1 != null) increaseDelayBtn1.addEventListener("click", () => { if (editMode) { delay1 /= 100; delay1++; delay1 *= 100 }; displayStats(); });
    if (decreaseDelayBtn1 != null) decreaseDelayBtn1.addEventListener("click", () => { if (editMode) { delay1 /= 100; delay1--; delay1 *= 100 }; displayStats(); });
    if (increaseDelayBtn2 != null) increaseDelayBtn2.addEventListener("click", () => { if (editMode) { delay2 /= 100; delay2++; delay2 *= 100 }; displayStats(); });
    if (decreaseDelayBtn2 != null) decreaseDelayBtn2.addEventListener("click", () => { if (editMode) { delay2 /= 100; delay2--; delay2 *= 100 }; displayStats(); });
    if (increaseDelayBtn3 != null) increaseDelayBtn3.addEventListener("click", () => { if (editMode) { delay3 /= 100; delay3++; delay3 *= 100 }; displayStats(); });
    if (decreaseDelayBtn3 != null) decreaseDelayBtn3.addEventListener("click", () => { if (editMode) { delay3 /= 100; delay3--; delay3 *= 100 }; displayStats(); });
}

function fetchDays() {
    if (timeToWait1 == null) {
        timeToWait1 = 0;
    }
    if (timeToWait2 == null) {
        timeToWait2 = 0;
    }
    if (timeToWait3 == null) {
        timeToWait3 = 0;
    }

    if (increaseTimeBtn1 != null) increaseTimeBtn1.addEventListener("click", () => { if (editMode) { timeToWait1++ }; displayStats(); });
    if (decreaseTimeBtn1 != null) decreaseTimeBtn1.addEventListener("click", () => { if (editMode) { timeToWait1-- }; displayStats(); });
    if (increaseTimeBtn2 != null) increaseTimeBtn2.addEventListener("click", () => { if (editMode) { timeToWait2++ }; displayStats(); });
    if (decreaseTimeBtn2 != null) decreaseTimeBtn2.addEventListener("click", () => { if (editMode) { timeToWait2-- }; displayStats(); });
    if (increaseTimeBtn3 != null) increaseTimeBtn3.addEventListener("click", () => { if (editMode) { timeToWait3++ }; displayStats(); });
    if (decreaseTimeBtn3 != null) decreaseTimeBtn3.addEventListener("click", () => { if (editMode) { timeToWait3-- }; displayStats(); });
}

function displayStats() {
    let latestPumpingDisplay1 = document.getElementById("latestPumping1");
    let latestPumpingDisplay2 = document.getElementById("latestPumping2");
    let latestPumpingDisplay3 = document.getElementById("latestPumping3");

    let timesPumpedDisplay1 = document.getElementById("displayAmountPumped1");
    let timesPumpedDisplay2 = document.getElementById("displayAmountPumped2");
    let timesPumpedDisplay3 = document.getElementById("displayAmountPumped3");

    if (delayDisplay1 != null) delayDisplay1.innerHTML = delay1;
    localStorage.setItem("delay1", delay1 + "");
    if (dayDisplay1 != null) dayDisplay1.innerHTML = timeToWait1;
    localStorage.setItem("timeToWait1", timeToWait1 + "");

    if (delayDisplay2 != null) delayDisplay2.innerHTML = delay2;
    localStorage.setItem("delay2", delay2 + "");
    if (dayDisplay2 != null) dayDisplay2.innerHTML = timeToWait2;
    localStorage.setItem("timeToWait2", timeToWait2 + "");

    if (delayDisplay3 != null) delayDisplay3.innerHTML = delay3;
    localStorage.setItem("delay3", delay3 + "");
    if (dayDisplay3 != null) dayDisplay3.innerHTML = timeToWait3;
    localStorage.setItem("timeToWait3", timeToWait3 + "");

    if (timesPumpedDisplay1 != null) timesPumpedDisplay1.innerHTML = timesPumped[0];
    if (timesPumpedDisplay2 != null) timesPumpedDisplay2.innerHTML = timesPumped[1];
    if (timesPumpedDisplay3 != null) timesPumpedDisplay3.innerHTML = timesPumped[2];
}

async function getMyNumbers(url, displayId) {
    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('response wasn"t ok');
            }
            return response.text()
        })
        .then(data => {
            document.getElementById(displayId).innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

function darkmodeButton() {
    if (localStorage.getItem("lightSwitch") == "0") {
        localStorage.setItem("lightSwitch", "1");
    } else if (localStorage.getItem("lightSwitch") == "1") {
        localStorage.setItem("lightSwitch", "2");
    } else if (localStorage.getItem("lightSwitch") == "2") {
        localStorage.setItem("lightSwitch", "3");
    } else {
        localStorage.setItem("lightSwitch", "0");
    }
    setColorTheme();
}

function setColorTheme() {
    if (localStorage.getItem("lightSwitch") == "2") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/classic/classicLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/classic/classicDark.css');
    } else if (localStorage.getItem("lightSwitch") == "1") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/classic/classicLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/classic/classicBright.css');
    } else if (localStorage.getItem("lightSwitch") == "3") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/modern/modernLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/modern/modernDark.css');
    } else if (localStorage.getItem("lightSwitch") == "0") {
        document.getElementById('layoutMode').setAttribute('href', './CSS/modern/modernLayout.css');
        document.getElementById('mode').setAttribute('href', './CSS/modern/modernBright.css');
    }
}

function activateOrDeactivateEditMode() {
    if (localStorage.getItem("editMode") == "on") {
        localStorage.setItem("editMode", "off");
    } else {
        localStorage.setItem("editMode", "on");
        saveSettingsBeforeEditing();
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
    if (localStorage.getItem("editMode") == "on") {
        activateButtons();
        if (editBtn != null) editBtn.setAttribute("class", "activeSiteButton");
        editMode = true; //Wenn !editmode und active darf er Pumpen, sonst nicht
        if (editBtn != null) editBtn.innerHTML = "Save Settings";
    } else {
        deactivateButtons();
        for (let i = 1; i <= pumps; i++) {
            sendPumpSettings(i, localStorage.getItem("timeToWait" + i), localStorage.getItem("delay" + i));
        }
        if (editBtn != null) editBtn.setAttribute("class", "siteButton");
        editMode = false;
        if (editBtn != null) editBtn.innerHTML = "Enter Edit Mode";
    }
}

function activateOrDeactivateProcess() {
    active = !active;
    if (localStorage.getItem("currentProgress") == "false") {
        localStorage.setItem("currentProgress", "true");
        processBtn.innerHTML = "ACTIVE";
        processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
    } else {
        processBtn.innerHTML = "INACTIVE";
        processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
        localStorage.setItem("currentProgress", "false");
    }
}

function deactivateButtons() {
    if (revertBtn != null) revertBtn.setAttribute("class", "inactiveSiteButton");
    if (increaseDelayBtn1 != null) increaseDelayBtn1.setAttribute("class", "inactiveIncreaseSec");
    if (increaseDelayBtn2 != null) increaseDelayBtn2.setAttribute("class", "inactiveIncreaseSec");
    if (increaseDelayBtn3 != null) increaseDelayBtn3.setAttribute("class", "inactiveIncreaseSec");
    if (decreaseDelayBtn1 != null) decreaseDelayBtn1.setAttribute("class", "inactiveDecreaseSec");
    if (decreaseDelayBtn2 != null) decreaseDelayBtn2.setAttribute("class", "inactiveDecreaseSec");
    if (decreaseDelayBtn3 != null) decreaseDelayBtn3.setAttribute("class", "inactiveDecreaseSec");
    
    if (increaseTimeBtn1 != null) increaseTimeBtn1.setAttribute("class", "inactiveIncreaseDays");
    if (increaseTimeBtn2 != null) increaseTimeBtn2.setAttribute("class", "inactiveIncreaseDays");
    if (increaseTimeBtn3 != null) increaseTimeBtn3.setAttribute("class", "inactiveIncreaseDays");
    if (decreaseTimeBtn1 != null) decreaseTimeBtn1.setAttribute("class", "inactiveDecreaseDays");
    if (decreaseTimeBtn2 != null) decreaseTimeBtn2.setAttribute("class", "inactiveDecreaseDays");
    if (decreaseTimeBtn3 != null) decreaseTimeBtn3.setAttribute("class", "inactiveDecreaseDays");
    lockButtons();
}

function lockButtons() {
    if (revertBtn != null) revertBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + revertBtn.innerHTML;

    if (increaseDelayBtn1 != null) increaseDelayBtn1.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn1.innerHTML;
    if (increaseDelayBtn2 != null) increaseDelayBtn2.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn2.innerHTML;
    if (increaseDelayBtn3 != null) increaseDelayBtn3.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseDelayBtn3.innerHTML;
    if (decreaseDelayBtn1 != null) decreaseDelayBtn1.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn1.innerHTML;
    if (decreaseDelayBtn2 != null) decreaseDelayBtn2.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn2.innerHTML;
    if (decreaseDelayBtn3 != null) decreaseDelayBtn3.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseDelayBtn3.innerHTML;

    if (increaseTimeBtn1 != null) increaseTimeBtn1.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn1.innerHTML;
    if (increaseTimeBtn2 != null) increaseTimeBtn2.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn2.innerHTML;
    if (increaseTimeBtn3 != null) increaseTimeBtn3.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + increaseTimeBtn3.innerHTML;
    if (decreaseTimeBtn1 != null) decreaseTimeBtn1.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn1.innerHTML;
    if (decreaseTimeBtn2 != null) decreaseTimeBtn2.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn2.innerHTML;
    if (decreaseTimeBtn3 != null) decreaseTimeBtn3.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + decreaseTimeBtn3.innerHTML;
}

function unlockButtons() {
    if (revertBtn != null) revertBtn.innerHTML = revertText;

    if (increaseDelayBtn1 != null) increaseDelayBtn1.innerHTML = increaseDelayText;
    if (increaseDelayBtn2 != null) increaseDelayBtn2.innerHTML = increaseDelayText;
    if (increaseDelayBtn3 != null) increaseDelayBtn3.innerHTML = increaseDelayText;
    if (decreaseDelayBtn1 != null) decreaseDelayBtn1.innerHTML = decreaseDelayText;
    if (decreaseDelayBtn2 != null) decreaseDelayBtn2.innerHTML = decreaseDelayText;
    if (decreaseDelayBtn3 != null) decreaseDelayBtn3.innerHTML = decreaseDelayText;

    if (increaseTimeBtn1 != null) increaseTimeBtn1.innerHTML = increaseTimeText;
    if (increaseTimeBtn2 != null) increaseTimeBtn2.innerHTML = increaseTimeText;
    if (increaseTimeBtn3 != null) increaseTimeBtn3.innerHTML = increaseTimeText;
    if (decreaseTimeBtn1 != null) decreaseTimeBtn1.innerHTML = decreaseTimeText;
    if (decreaseTimeBtn2 != null) decreaseTimeBtn2.innerHTML = decreaseTimeText;
    if (decreaseTimeBtn3 != null) decreaseTimeBtn3.innerHTML = decreaseTimeText;
}

function activateButtons() {
    if (revertBtn != null) revertBtn.setAttribute("class", "siteButton");
    if (increaseDelayBtn1 != null) increaseDelayBtn1.setAttribute("class", "activeIncreaseSec");
    if (increaseDelayBtn2 != null) increaseDelayBtn2.setAttribute("class", "activeIncreaseSec");
    if (increaseDelayBtn3 != null) increaseDelayBtn3.setAttribute("class", "activeIncreaseSec");
    if (decreaseDelayBtn1 != null) decreaseDelayBtn1.setAttribute("class", "activeDecreaseSec");
    if (decreaseDelayBtn2 != null) decreaseDelayBtn2.setAttribute("class", "activeDecreaseSec");
    if (decreaseDelayBtn3 != null) decreaseDelayBtn3.setAttribute("class", "activeDecreaseSec");

    if (increaseTimeBtn1 != null) increaseTimeBtn1.setAttribute("class", "activeIncreaseDays");
    if (increaseTimeBtn2 != null) increaseTimeBtn2.setAttribute("class", "activeIncreaseDays");
    if (increaseTimeBtn3 != null) increaseTimeBtn3.setAttribute("class", "activeIncreaseDays");
    if (decreaseTimeBtn1 != null) decreaseTimeBtn1.setAttribute("class", "activeDecreaseDays");
    if (decreaseTimeBtn2 != null) decreaseTimeBtn2.setAttribute("class", "activeDecreaseDays");
    if (decreaseTimeBtn3 != null) decreaseTimeBtn3.setAttribute("class", "activeDecreaseDays");
    unlockButtons();
}

function saveSettingsBeforeEditing() {
    //alles wos ma editen kann saven

    localStorage.setItem("delayBackup1", delay1 + "");
    localStorage.setItem("delayBackup2", delay2 + "");
    localStorage.setItem("delayBackup3", delay3 + "");
    localStorage.setItem("timeToWaitBackup1", timeToWait1 + "");
    localStorage.setItem("timeToWaitBackup2", timeToWait2 + "");
    localStorage.setItem("timeToWaitBackup3", timeToWait3 + "");
}

function revertSettings() {
    //alles wiederrufen

    delay1 = localStorage.getItem("delayBackup1");
    delay2 = localStorage.getItem("delayBackup2");
    delay3 = localStorage.getItem("delayBackup3");
    timeToWait1 = localStorage.getItem("timeToWaitBackup1");
    timeToWait2 = localStorage.getItem("timeToWaitBackup2");
    timeToWait3 = localStorage.getItem("timeToWaitBackup3");

    //rendern
    displayStats();
}
init();