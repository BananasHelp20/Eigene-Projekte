var currDaysPump1 = "1";
var currDaysPump2 = "2";
var currDaysPump3 = "3";

var currSecPump1 = "4";
var currSecPump2 = "5";
var currSecPump3 = "6";

const file1 = "/currD1.txt";
const file2 = "/currD2.txt";
const file3 = "/currD3.txt";
const file4 = "/currS1.txt";
const file5 = "/currS2.txt";
const file6 = "/currS3.txt";
setColorTheme();

// fetch(file1)
//       .then(response => response.text())
//       .then(data => {
//       currDaysPump1 = data;
// });

// fetch(file2)
//       .then(response => response.text())
//       .then(data => {
//         currDaysPump2 = data;
// });
// // https://github.com/me-no-dev/ESPAsyncWebServer?tab=readme-ov-file#responses

// fetch(file3)
//       .then(response => response.text())
//       .then(data => {
//         currDaysPump3 = data;
// });

// fetch(file4)
//       .then(response => response.text())
//       .then(data => {
//         currSecPump1 = data;
// });

// fetch(file5)
//       .then(response => response.text())
//       .then(data => {
//         currSecPump2 = data;
// });

// fetch(file6)
//       .then(response => response.text())
//       .then(data => {
//         currSecPump3 = data;
// });

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

function setColorTheme() {
  if (localStorage.getItem("darkmode") == "true") {
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage2.jpg');
    document.getElementById('mode').setAttribute('href', './css/darkmode.css');
  } else {
    document.getElementById('mode').setAttribute('href', './css/style.css');
    document.getElementById('backgroundImg').setAttribute('src', './images/backgroundImage.jpg');
  }
}