let delay = localStorage.getItem("delay");
let timeToWait = localStorage.getItem("timeToWait");
let active;
let editMode;

let plusBtn = document.getElementById('plus');
let minusBtn = document.getElementById('minus');
let revertBtn = document.getElementById('revert');
let plusDaysBtn = document.getElementById("plusDays");
let minusDaysBtn = document.getElementById("minusDays");
let editBtn = document.getElementById("edit");
let process = document.getElementById("progress");
let processSite = document.getElementById("progressSite");

function init() {
    //darkmode/lightmode
    document.getElementById("lightSwitch").addEventListener("click", () => {darkmodeButton();});
    setColorTheme();

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
    checkTime();

    console.log(delay);
    console.log(localStorage.getItem("delay"));
    console.log(timeToWait);
    console.log(localStorage.getItem("timeToWait"));
    console.log(active);
    console.log(localStorage.getItem("active"));
    console.log(new Date());
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
        if (editBtn != null) editBtn.setAttribute("class", "siteButton");
        editMode = false;
        if (editBtn != null) editBtn.innerHTML = "Activate Edit Mode";
    }
}

function fetchProcess() {
    if (localStorage.getItem("currentProgress") == "true") {
        active = true;
        if (process != null) process.innerHTML = "ACTIVE";
        if (processSite != null) processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
    } else {
        if (process != null) process.innerHTML = "INACTIVE";
        if (processSite != null) processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
        active = false;
    }

    if (process != null) process.addEventListener("click", () => {
        active = !active;
        if (localStorage.getItem("currentProgress") == "false") {
            localStorage.setItem("currentProgress", "true");
            process.innerHTML = "ACTIVE";
            processSite.setAttribute("class", "fa-solid fa-toggle-on menuOption");
        } else {
            process.innerHTML = "INACTIVE";
            processSite.setAttribute("class", "fa-solid fa-toggle-off menuOption");
            localStorage.setItem("currentProgress", "false");
        }
    });
}

function checkTime() {
    if (localStorage.getItem("timestamp") == null) {
        localStorage.setItem("timestamp", 0);
    }

    if (new Date().getTime() - localStorage.getItem("timestamp") >= localStorage.getItem("timeToWait") * 10000 && active && !editMode) {
        // fetch('/usePump1');
        sleep(localStorage.getItem("delay") * 1000);
        // fetch('/stopPump1');
        localStorage.setItem("timestamp", new Date().getTime());
        console.log("PUMPED!!!");
    }
}

function fetchSec() {
    if (delay == null) {
        delay = 0;
    }

    if (plusBtn != null) plusBtn.addEventListener("click", () => { if (editMode) { delay++ }; displayStats(); });
    if (minusBtn != null) minusBtn.addEventListener("click", () => { if (editMode) { delay-- }; displayStats(); });
}

function fetchDays() {
    if (timeToWait == null) {
        timeToWait = 0;
    }

    if (plusDaysBtn != null) plusDaysBtn.addEventListener("click", () => { if (editMode) { timeToWait++ }; displayStats(); });
    if (minusBtn != null) minusDaysBtn.addEventListener("click", () => { if (editMode) { timeToWait-- }; displayStats(); });
}

function deactivateButtons() {
    if (plusBtn != null) plusBtn.setAttribute("class", "inactiveSiteButton");
    if (minusBtn != null) minusBtn.setAttribute("class", "inactiveSiteButton");
    if (revertBtn != null) revertBtn.setAttribute("class", "inactiveSiteButton");
    if (plusBtn != null) plusDaysBtn.setAttribute("class", "inactiveSiteButton");
    if (minusDaysBtn != null) minusDaysBtn.setAttribute("class", "inactiveSiteButton");
    lockButtons();
}

//litteral text
let plusText = "Delay + 1s";
let minusText = "Delay - 1s";
let revertText = "Revert Editing";
let plusDaysText = "Days + 1s";
let minusDaysText = "Days - 1s";

function lockButtons() {
    if (plusBtn != null) plusBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + plusBtn.innerHTML;
    if (minusBtn != null) minusBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + minusBtn.innerHTML;
    if (revertBtn != null) revertBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + revertBtn.innerHTML;
    if (plusDaysBtn != null) plusDaysBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + plusDaysBtn.innerHTML;
    if (minusDaysBtn != null) minusDaysBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + minusDaysBtn.innerHTML;
}

function unlockButtons() {
    if (plusBtn != null) plusBtn.innerHTML = plusText;
    if (minusBtn != null) minusBtn.innerHTML = minusText;
    if (revertBtn != null) revertBtn.innerHTML = revertText;
    if (plusDaysBtn != null) plusDaysBtn.innerHTML = plusDaysText; 
    if (minusDaysBtn != null) minusDaysBtn.innerHTML = minusDaysText;
}

function activateButtons() {
    if (plusBtn != null) plusBtn.setAttribute("class", "siteButton");
    if (minusBtn != null) minusBtn.setAttribute("class", "siteButton");
    if (revertBtn != null) revertBtn.setAttribute("class", "siteButton");
    if (plusDaysBtn != null) plusDaysBtn.setAttribute("class", "siteButton");
    if (minusDaysBtn != null) minusDaysBtn.setAttribute("class", "siteButton");
    unlockButtons();
}

function saveSettingsBeforeEditing() {
    //alles wos ma editen kann saven

    localStorage.setItem("delayBackup", delay + "");
    localStorage.setItem("timeToWaitBackup", timeToWait + "");
}

function revertSettings() {
    //alles wiederrufen

    delay = localStorage.getItem("delayBackup");
    timeToWait = localStorage.getItem("timeToWaitBackup");

    //rendern
    displayStats();
}

function displayStats() {
    document.getElementById('display').innerHTML = delay;
    localStorage.setItem("delay", delay + "");
    document.getElementById('displayDays').innerHTML = timeToWait;
    localStorage.setItem("timeToWait", timeToWait + "");
}

// function getAndDisplayMyNumbers(url, displayId) {
//     // AJAX Anfrage mit Fetch API
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('response wasn"t ok');
//             }
//             return response.text()
//         })
//         .then(data => {
//             document.getElementById(displayId).innerHTML = data;
//         })
//         .catch(error => console.error('Error:', error));
// }
init();