let currDaysPump1 = "1";
let currDaysPump2 = "2";
let currDaysPump3 = "3";

let currSecPump1 = "4";
let currSecPump2 = "5";
let currSecPump3 = "6";

let currentlyRunning = true;

setColorTheme();
async function getMyNumbers(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    alert("a wild Error has appeared: " + error);
  }
}

alert(responseText);

currDaysPump1 = getMyNumbers("/decreaseDaysPump1"); //tu des in des statt dem fetch in de buttons ins onclick="";
currDaysPump2 = getMyNumbers("/decreaseDaysPump2");
currDaysPump3 = getMyNumbers("/decreaseDaysPump3");




//ausgabe
document.getElementById("currDaysPump1").textContent = currDaysPump1;
document.getElementById("currDaysPump2").textContent = currDaysPump2;
document.getElementById("currDaysPump3").textContent = currDaysPump3;

document.getElementById("currSecPump1").textContent = currSecPump1;
document.getElementById("currSecPump2").textContent = currSecPump2;
document.getElementById("currSecPump3").textContent = currSecPump3;

function darkmodeButton() {
  console.log(localStorage.getItem("darkmode"))
  if (localStorage.getItem("darkmode") == "true") {
    localStorage.setItem("darkmode", "false");
  } else {
    localStorage.setItem("darkmode", "true");
  }

  setColorTheme();
}

function f() {
  asdfasfdasf

}

function setColorTheme() {
  if (localStorage.getItem("darkmode") == "true") {
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage2.jpg');
    document.getElementById('mode').setAttribute('href', './css/darkmode.css');
  } else {
    document.getElementById('mode').setAttribute('href', './css/style.css');
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage.jpg');
  }
}