let active = true;
let editMode = false;

let revertBtn = document.getElementById("revert");
let editBtn = document.getElementById("edit");
let processSite = document.getElementById("progressSite");
let processBtn = document.getElementById("progress");
let smallProcessBtn = document.getElementById("smallProcessBtn");

let timesPumped = [];
let delays = [];
let dayIntervals = [];

//litteral text
let revertText = "Revert Editing";
let increaseSecText = "um 0.1 Sekunden erhöhen";
let decreaseSecText = "um 0.1 Sekunden verringern";
let increaseDaysText = "um 1 Tag erhöhen";
let decreaseDaysText = "um 1 Tag verringern";

function createPumpInDecrease(count) {
    let container = document.getElementById("pumpDiv");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let buttons = [document.createElement("button"), document.createElement("button"), document.createElement("button"), document.createElement("button")];
        
        buttons[0].classList.add("activeIncreaseDays");
        buttons[0].id = `increaseDaysPump${i + 1}`;
        buttons[0].innerText = increaseDaysText;

        buttons[1].classList.add("activeDecreaseDays");
        buttons[1].id = `decreaseDaysPump${i + 1}`;
        buttons[1].innerText = decreaseDaysText;
        
        buttons[2].classList.add("activeIncreaseSec");
        buttons[2].id = `increaseSecPump${i + 1}`;
        buttons[2].innerText = increaseSecText;
        
        buttons[3].classList.add("activeDecreaseSec");
        buttons[3].id = `decreaseSecPump${i + 1}`;
        buttons[3].innerText = decreaseSecText;

        let displays = [document.createElement("span"), document.createElement("span")];
        
        displays[0].id = `dayDisplay${i + 1}`;
        displays[1].id = `delayDisplay${i + 1}`;

        let texts = [document.createElement("span"), document.createElement("span")];
        
        texts[0].innerText = "Intervall in Tagen: ";
        texts[0].appendChild(displays[0]);
        texts[1].innerText = "Dauer in Millisekunden: ";
        texts[1].appendChild(displays[1]);
        
        let breaks = [document.createElement("br"), document.createElement("br"), document.createElement("br"), document.createElement("br"), document.createElement("br"), document.createElement("br")];

        let header = document.createElement("h1");

        header.id = "subHeadingText";
        header.innerText = `Pumpe ${i + 1}`;

        let actionContainer = document.createElement("div");
        
        actionContainer.classList.add("text");
        
        actionContainer.appendChild(texts[0]);
        actionContainer.appendChild(breaks[0]);
        actionContainer.appendChild(buttons[0]);
        actionContainer.appendChild(breaks[1]);
        actionContainer.appendChild(buttons[1]);
        
        actionContainer.appendChild(breaks[2]);
        actionContainer.appendChild(breaks[3]);

        actionContainer.appendChild(texts[1]);
        actionContainer.appendChild(breaks[4]);
        actionContainer.appendChild(buttons[2]);
        actionContainer.appendChild(breaks[5]);
        actionContainer.appendChild(buttons[3]);
        
        let pumpEntry = document.createElement("div");

        pumpEntry.classList.add("pump");
        pumpEntry.id = `pumpId${i + 1}`;
        pumpEntry.appendChild(header);
        pumpEntry.appendChild(actionContainer);

        container.appendChild(pumpEntry);
    }
}

function createPumpActions(count) {
    let container = document.getElementById("useDiv");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let buttons = [document.createElement("button"), document.createElement("button")];

        buttons[0].id = `pump${i + 1}`;
        buttons[0].classList.add("useIt");
        buttons[0].innerText = `Pumpe ${i + 1} betätigen`;
        buttons[1].id = `pump${i + 1}NoCTR`;
        buttons[1].classList.add("useItWisely");
        buttons[1].innerText = `Zeitinterval nicht zurücksetzen`;

        let wrapper = document.createElement("div");
        
        wrapper.appendChild(buttons[0]);
        wrapper.appendChild(buttons[1]);
        wrapper.appendChild(document.createElement("br"));

        container.appendChild(wrapper);
    }
}

function initializeFeature(count) {
    //darkmode/lightmode
    document.getElementById("lightSwitch").addEventListener("click", () => {
        darkmodeButton();
    });

    //edit button
    if (editBtn != null)
        editBtn.addEventListener("click", () => {
            activateOrDeactivateEditMode(count);
        });

    //revert button
    if (revertBtn != null)
        revertBtn.addEventListener("click", () => {
            if (editMode) revertSettings();
        });
}

function initializePumps(count) {
    if (document.getElementById("useDiv")) {
        createPumpActions(count);
        for (let i = 1; i <= count; i++) {
            document.getElementById(`pump${i}`).addEventListener("click", () => {
                if (!editMode && active) sendPumpSignal(i, parseInt(localStorage.getItem(`delay${i}`)) || 1000);
            });

            document.getElementById(`pump${i}NoCTR`).addEventListener("click", () => {
                if (!editMode && active) sendPumpSignalWithoutCounterChange(i, parseInt(localStorage.getItem(`delay${i}`)) || 1000);
            });
        }
    }

    let container = document.getElementById("pumpDiv");
    if (!container) return;

    createPumpInDecrease(count);
    for (let i = 1; i <= count; i++) {
        timesPumped[i - 1] = parseInt(localStorage.getItem(`timesPumped${i}`)) || 0;
        delays[i - 1] = parseInt(localStorage.getItem(`delay${i}`)) || 0;
        dayIntervals[i - 1] = parseInt(localStorage.getItem(`timeToWait${i}`)) || 0;

        document.getElementById(`increaseSecPump${i}`).addEventListener("click", () => {
            if (editMode) changeDuration(i, 100);
            displayStats();
        });

        document.getElementById(`decreaseSecPump${i}`).addEventListener("click", () => {
            if (editMode) changeDuration(i, -100);
            displayStats();
        });

        document.getElementById(`increaseDaysPump${i}`).addEventListener("click", () => {
            if (editMode) changeInterval(i, 1);
            displayStats();
        });

        document.getElementById(`decreaseDaysPump${i}`).addEventListener("click", () => {
            if (editMode) changeInterval(i, -1);
            displayStats();
        });
    }
}