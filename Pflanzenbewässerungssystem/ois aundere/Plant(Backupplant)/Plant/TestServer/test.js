let responseText;

responseText = fetch('http://127.0.0.1:3000/increaseDaysPump1').then(response => response.text);

console.log(responseText);