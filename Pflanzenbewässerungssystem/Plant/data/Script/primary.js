// function init() {
//     //darkmode/lightmode
//     setColorTheme();
//     initializePumps(count);

//     //edit mode an und aus
//     initializeFeature();
//     editSettingsModeCheck();

//     //zeit zeigs
//     displayStats();
// }

function init() {
    setColorTheme();
    getPumpCount().then((pumpCount) => {
        initializePumps(pumpCount);
    });
    initializeFeature();
    let pumpObjects;
    getData().then((data) => {
        pumpObjects = data;
        for (let i = 0; i < pumpObjects.length; i++) {
            delays.push(pumpObjects[i].duration);
            dayIntervals.push(pumpObjects[i].interval);
            timesPumped.push(pumpObjects[i].timesPumped);
        }
        displayStats();
    });
}

init();