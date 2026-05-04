function sendPumpSignal(number, duration) {
    fetch('/api/pump', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function sendPumpSignalWithoutCounterChange(number, duration) {
    fetch('/api/pump/no-counter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function setNewDuration(number, duration) {
    fetch('/api/setDuration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function setNewInterval(number, interval) {
    fetch('/api/setInterval', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, interval: interval })
    });
}

async function getData() {
    const response = await fetch('/api/getData');
    const data = await response.json();
    return data;
}