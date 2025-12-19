init();

function init() {
  //darkmode/lightmode
  setColorTheme();

  //ich hohle mir die daten, und gebe sie aus
  fetchDays();
  fetchProcess();
  fetchSec();

  //Statistiken ausgeben
  statistics();
}

function fetchProcess() {
  document.getElementById("start").addEventListener("click", () => {getMyNumbers("/startProcess", "currentlyDoingAnything")});
  document.getElementById("stop").addEventListener("click", () => {getMyNumbers("/stopProcess", "currentlyDoingAnything")});
}

function fetchSec() {
  document.getElementById("increaseSecPump1").addEventListener("click", () => {getMyNumbers("/increaseSecPump1", "currSecPump1")});
  document.getElementById("decreaseSecPump1").addEventListener("click", () => {getMyNumbers("/decreaseSecPump1", "currSecPump1")});
  
  document.getElementById("increaseSecPump2").addEventListener("click", () => {getMyNumbers("/increaseSecPump2", "currSecPump2")});
  document.getElementById("decreaseSecPump2").addEventListener("click", () => {getMyNumbers("/decreaseSecPump2", "currSecPump2")});

  document.getElementById("increaseSecPump3").addEventListener("click", () => {getMyNumbers("/increaseSecPump3", "currSecPump3")});
  document.getElementById("decreaseSecPump3").addEventListener("click", () => {getMyNumbers("/decreaseSecPump3", "currSecPump3")});
}

function fetchDays() {
  document.getElementById("increaseDaysPump1").addEventListener("click", () => {getMyNumbers("/increaseDaysPump1", "currDaysPump1")});
  document.getElementById("decreaseDaysPump1").addEventListener("click", () => {getMyNumbers("/decreaseDaysPump1", "currDaysPump1")});

  document.getElementById("increaseDaysPump2").addEventListener("click", () => {getMyNumbers("/increaseDaysPump2", "currDaysPump2")});
  document.getElementById("decreaseDaysPump2").addEventListener("click", () => {getMyNumbers("/decreaseDaysPump2", "currDaysPump2")});

  document.getElementById("increaseDaysPump3").addEventListener("click", () => {getMyNumbers("/increaseDaysPump3", "currDaysPump3")});
  document.getElementById("decreaseDaysPump3").addEventListener("click", () => {getMyNumbers("/decreaseDaysPump3", "currDaysPump3")});
}

function getMyNumbers(url, displayId) {
    // AJAX Anfrage mit Fetch API
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(displayId).innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}

function darkmodeButton() {
  console.log(localStorage.getItem("darkmode"));
  if (localStorage.getItem("darkmode") == "true") {
    localStorage.setItem("darkmode", "false");
  } else {
    localStorage.setItem("darkmode", "true");
  }

  setColorTheme();
}

function setColorTheme() {
  if (localStorage.getItem("darkmode") == "true") {
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage2.jpg');
    document.getElementById('mode').setAttribute('href', './css/darkColors.css');
  } else {
    document.getElementById('mode').setAttribute('href', './css/lightColors.css');
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage.jpg');
  }
}

function statistics() {
  
}