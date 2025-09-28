function getAndDisplayMyNumbers(url, displayId) {
    // AJAX Anfrage mit Fetch API
    fetch(url)
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
    console.log(localStorage.getItem("lightSwitch"));
    if (localStorage.getItem("lightSwitch") == "true") {
        localStorage.setItem("lightSwitch", "false");
    } else {
        localStorage.setItem("lightSwitch", "true");
    }
  
    setColorTheme();
}
  
function setColorTheme() {
    if (localStorage.getItem("lightSwitch") == "true") {
        document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage2.jpg');
        document.getElementById('mode').setAttribute('href', './CSS/darkColors.css');
    } else {
        document.getElementById('mode').setAttribute('href', './CSS/brightColors.css');
        document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage.jpg');
    }
}
  
// function displayStatistics() {
    
// }

function fetchPumps() {
    document.getElementsById("pump1").addEventListener("click", () => { fetch('/usePump1') });
    document.getElementsById("pump2").addEventListener("click", () => { fetch('/usePump2') });
    document.getElementsById("pump3").addEventListener("click", () => { fetch('/usePump3') });
}

function eat() {
    let i = 1;
    console.log(i);
}

function fetchProcess() {
    document.getElementById("start").addEventListener("click", () => {getAndDisplayMyNumbers("/startProcess", "currentlyDoingAnything")});
    document.getElementById("stop").addEventListener("click", () => {getAndDisplayMyNumbers("/stopProcess", "currentlyDoingAnything")});
}

function fetchSec() {
    document.getElementById("increaseSecPump1").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseSecPump1", "currSecPump1")});
    document.getElementById("decreaseSecPump1").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseSecPump1", "currSecPump1")});
    
    document.getElementById("increaseSecPump2").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseSecPump2", "currSecPump2")});
    document.getElementById("decreaseSecPump2").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseSecPump2", "currSecPump2")});
  
    document.getElementById("increaseSecPump3").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseSecPump3", "currSecPump3")});
    document.getElementById("decreaseSecPump3").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseSecPump3", "currSecPump3")});
}
  
function fetchDays() {
    document.getElementById("increaseDaysPump1").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseDaysPump1", "currDaysPump1")});
    document.getElementById("decreaseDaysPump1").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseDaysPump1", "currDaysPump1")});
  
    document.getElementById("increaseDaysPump2").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseDaysPump2", "currDaysPump2")});
    document.getElementById("decreaseDaysPump2").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseDaysPump2", "currDaysPump2")});
  
    document.getElementById("increaseDaysPump3").addEventListener("click", () => {getAndDisplayMyNumbers("/increaseDaysPump3", "currDaysPump3")});
    document.getElementById("decreaseDaysPump3").addEventListener("click", () => {getAndDisplayMyNumbers("/decreaseDaysPump3", "currDaysPump3")});
}

function init() {
  //darkmode/lightmode
  document.getElementById("lightSwitch").addEventListener("click", () => {darkmodeButton();});
  setColorTheme();

  //fetchen der routen
  fetchPumps();
  fetchDays();
  fetchProcess();
  fetchSec();

  //Statistiken ausgeben
//   displayStatistics();
}

init();