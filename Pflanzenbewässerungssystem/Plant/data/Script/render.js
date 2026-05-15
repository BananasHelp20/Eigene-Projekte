function displayStats(count) {
    let latestPumpingDisplays = document.getElementById(`latestPumping`);

    let timesPumpedDisplay1 = document.getElementById("displayAmountPumped1");
    let timesPumpedDisplay2 = document.getElementById("displayAmountPumped2");
    let timesPumpedDisplay3 = document.getElementById("displayAmountPumped3");

    for (let i = 0; i < count; i++) {
        if (document.getElementById(`delayDisplay${i + 1}`) != null) document.getElementById(`delayDisplay${i + 1}`).innerHTML = delays[i];
        if (document.getElementById(`dayDisplay${i + 1}`) != null) document.getElementById(`dayDisplay${i + 1}`).innerHTML = dayIntervals[i];
    }

    if (timesPumpedDisplay1 != null) timesPumpedDisplay1.innerHTML = timesPumped[0];
    if (timesPumpedDisplay2 != null) timesPumpedDisplay2.innerHTML = timesPumped[1];
    if (timesPumpedDisplay3 != null) timesPumpedDisplay3.innerHTML = timesPumped[2];
}

function deactivateButtons(count) {
    if (revertBtn != null) revertBtn.setAttribute("class", "inactiveSiteButton");

    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`increaseSecPump${i}`) != null) document.getElementById(`increaseSecPump${i}`).setAttribute("class", "inactiveIncreaseSec");
        if (document.getElementById(`decreaseSecPump${i}`) != null) document.getElementById(`decreaseSecPump${i}`).setAttribute("class", "inactiveDecreaseSec");
        if (document.getElementById(`increaseDaysPump${i}`) != null) document.getElementById(`increaseDaysPump${i}`).setAttribute("class", "inactiveIncreaseDays");
        if (document.getElementById(`decreaseDaysPump${i}`) != null) document.getElementById(`decreaseDaysPump${i}`).setAttribute("class", "inactiveDecreaseDays");
    }
    lockButtons(count);
}

function lockButtons(count) {
    if (revertBtn != null) revertBtn.innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + revertBtn.innerHTML;

    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`increaseSecPump${i}`) != null) document.getElementById(`increaseSecPump${i}`).innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + document.getElementById(`increaseSecPump${i}`).innerHTML;
        if (document.getElementById(`decreaseSecPump${i}`) != null) document.getElementById(`decreaseSecPump${i}`).innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + document.getElementById(`decreaseSecPump${i}`).innerHTML;
        if (document.getElementById(`increaseDaysPump${i}`) != null) document.getElementById(`increaseDaysPump${i}`).innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + document.getElementById(`increaseDaysPump${i}`).innerHTML;
        if (document.getElementById(`decreaseDaysPump${i}`) != null) document.getElementById(`decreaseDaysPump${i}`).innerHTML = '<i class="fa-solid fa-lock"></i>' + " " + document.getElementById(`decreaseDaysPump${i}`).innerHTML;
    }
}

function unlockButtons(count) {
    if (revertBtn != null) revertBtn.innerHTML = revertText;
    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`increaseSecPump${i}`) != null) document.getElementById(`increaseSecPump${i}`).innerHTML = increaseSecText;
        if (document.getElementById(`decreaseSecPump${i}`) != null) document.getElementById(`decreaseSecPump${i}`).innerHTML = decreaseSecText;
        if (document.getElementById(`increaseDaysPump${i}`) != null) document.getElementById(`increaseDaysPump${i}`).innerHTML = increaseDaysText;
        if (document.getElementById(`decreaseDaysPump${i}`) != null) document.getElementById(`decreaseDaysPump${i}`).innerHTML = decreaseDaysText;
    }
}

function activateButtons(count) {
    if (revertBtn != null) revertBtn.setAttribute("class", "siteButton");

    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`increaseSecPump${i}`) != null) document.getElementById(`increaseSecPump${i}`).setAttribute("class", "activeIncreaseSec");
        if (document.getElementById(`decreaseSecPump${i}`) != null) document.getElementById(`decreaseSecPump${i}`).setAttribute("class", "activeDecreaseSec");
        if (document.getElementById(`increaseDaysPump${i}`) != null) document.getElementById(`increaseDaysPump${i}`).setAttribute("class", "activeIncreaseDays");
        if (document.getElementById(`decreaseDaysPump${i}`) != null) document.getElementById(`decreaseDaysPump${i}`).setAttribute("class", "activeDecreaseDays");
    }
    unlockButtons(count);
}