function sendPumpSignal(number, duration) {
    fetch('/api/pump', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: number, duration: duration })
    });
}

function getPumpCount() {
    return fetch('/api/pumpCount')
        .then(response => response.json())
        .then(data => data.count);
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

function getData() {
    return fetch('/api/getData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}