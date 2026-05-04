function sendPumpSignal(number, duration) {
    fetch('/pump', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function sendPumpSignalWithoutCounterChange(number, duration) {
    fetch('/pump/no-counter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function setNewDuration(number, duration) {
    fetch('/setDuration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function setNewInterval(number, interval) {
    fetch('/setInterval', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, interval: interval })
    });
}

async function getData() {
    const response = await fetch('/data');
    const data = await response.json();
    return data;
}