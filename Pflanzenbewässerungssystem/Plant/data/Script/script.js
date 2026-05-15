function changeDuration(pumpNumber, durationChange) {
    delays[pumpNumber - 1] = Number(durationChange) + Number(delays[pumpNumber - 1]);
    localStorage.setItem(`delay${pumpNumber}`, delays[pumpNumber - 1] + "");
}

function changeInterval(pumpNumber, intervalChange) {
    dayIntervals[pumpNumber - 1] = Number(intervalChange) + Number(dayIntervals[pumpNumber - 1]);
    localStorage.setItem(`timeToWait${pumpNumber}`, dayIntervals[pumpNumber - 1] + "");
}

function getEditMode() {
    return editMode;
}

function darkmodeButton() {
    if (localStorage.getItem("lightSwitch") == "0") {
        localStorage.setItem("lightSwitch", "1");
    } else if (localStorage.getItem("lightSwitch") == "1") {
        localStorage.setItem("lightSwitch", "2");               
    } else if (localStorage.getItem("lightSwitch") == "2") {
        localStorage.setItem("lightSwitch", "1");           //IMPORTANT: "3" -> theme chain / "1" -> binary theme
    } else {
        localStorage.setItem("lightSwitch", "1"); //"0"
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

function activateOrDeactivateEditMode(count) {
    if (localStorage.getItem("editMode") == "on" || editMode) {
        localStorage.setItem("editMode", "off");
        editMode = false;
    } else {
        localStorage.setItem("editMode", "on");
        editMode = true;
        saveSettingsBeforeEditing();
    }
    editSettingsModeCheck(count);
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function firstEditModeCheck() {
    if (localStorage.getItem("editMode") == "on" || editMode) {
        activateButtons();
        if (editBtn != null) editBtn.setAttribute("class", "activeSiteButton");
        editMode = true; //Wenn !editmode und active darf er Pumpen, sonst nicht
        if (editBtn != null) editBtn.innerHTML = "Save Settings";
    } else {
        deactivateButtons();
        if (editBtn != null) editBtn.setAttribute("class", "siteButton");
        editMode = false;
        if (editBtn != null) editBtn.innerHTML = "Enter Edit Mode";
    }
}

function editSettingsModeCheck(count) {
    if (localStorage.getItem("editMode") == "on" || editMode) {
        activateButtons();
        if (editBtn != null) editBtn.setAttribute("class", "activeSiteButton");
        editMode = true; //Wenn !editmode und active darf er Pumpen, sonst nicht
        if (editBtn != null) editBtn.innerHTML = "Save Settings";
    } else {
        deactivateButtons();
        for (let i = 1; i <= count; i++) {
            sendPumpSettings(i, parseInt(localStorage.getItem("timeToWait" + i)), parseInt(localStorage.getItem("delay" + i)));
        }
        if (editBtn != null) editBtn.setAttribute("class", "siteButton");
        editMode = false;
        if (editBtn != null) editBtn.innerHTML = "Enter Edit Mode";
    }
}

function sendPumpSettings(number, interval, duration) {
    setNewDuration(number, duration);
    setNewInterval(number, interval);
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

function saveSettingsBeforeEditing() {
    //alles wos ma editen kann saven
    localStorage.setItem("delayBackup1", delays[0] + "");
    localStorage.setItem("delayBackup2", delays[1] + "");
    localStorage.setItem("delayBackup3", delays[2] + "");
    localStorage.setItem("timeToWaitBackup1", dayIntervals[0] + "");
    localStorage.setItem("timeToWaitBackup2", dayIntervals[1] + "");
    localStorage.setItem("timeToWaitBackup3", dayIntervals[2] + "");
}

function revertSettings() {
    //alles wiederrufen
    delays[0] = parseInt(localStorage.getItem("delayBackup1")) || 0;
    delays[1] = parseInt(localStorage.getItem("delayBackup2")) || 0;
    delays[2] = parseInt(localStorage.getItem("delayBackup3")) || 0;
    dayIntervals[0] = parseInt(localStorage.getItem("timeToWaitBackup1")) || 0;
    dayIntervals[1] = parseInt(localStorage.getItem("timeToWaitBackup2")) || 0;
    dayIntervals[2] = parseInt(localStorage.getItem("timeToWaitBackup3")) || 0;

    //rendern
    displayStats();
}