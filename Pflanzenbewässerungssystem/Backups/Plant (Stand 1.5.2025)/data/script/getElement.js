(function init() {
  // darkmode/lightmode
  setColorTheme();

  // attach pump buttons (doSomething.html)
  attachIfExists("pump1", () => sendPumpCommand("/usePump1", "pump1", "pump1Status"));
  attachIfExists("pump1NoCTR", () => sendPumpCommand("/usePump1IgnoreCTR", "pump1NoCTR", "pump1Status"));

  attachIfExists("pump2", () => sendPumpCommand("/usePump2", "pump2", "pump2Status"));
  attachIfExists("pump2NoCTR", () => sendPumpCommand("/usePump2IgnoreCTR", "pump2NoCTR", "pump2Status"));

  attachIfExists("pump3", () => sendPumpCommand("/usePump3", "pump3", "pump3Status"));
  attachIfExists("pump3NoCTR", () => sendPumpCommand("/usePump3IgnoreCTR", "pump3NoCTR", "pump3Status"));

  // existing pages: only attach these when elements exist
  if (document.getElementById("start") || document.getElementById("stop")) {
    fetchProcess();
  }
  if (document.getElementById("increaseSecPump1")) {
    fetchSec();
  }
  if (document.getElementById("increaseDaysPump1")) {
    fetchDays();
  }

  statistics();
})();

function attachIfExists(id, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", handler);
}

async function sendPumpCommand(url, btnId, statusId) {
  const btn = document.getElementById(btnId);
  const status = document.getElementById(statusId);
  if (!btn || !status) return;
  btn.disabled = true;
  const prevText = status.innerText;
  status.innerText = "sending...";
  try {
    const resp = await fetch(url, { method: "GET" });
    const text = await resp.text();
    status.innerText = text || "OK";
  } catch (err) {
    console.error(err);
    status.innerText = "error";
  } finally {
    // re-enable after small delay so user sees status (adjust if needed)
    setTimeout(() => {
      btn.disabled = false;
      status.innerText = prevText;
    }, 800);
  }
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