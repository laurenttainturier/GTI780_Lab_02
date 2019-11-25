let temp = [];
let pression = [];
client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000), "client" + Math.floor(Math.random() * 10).toString());
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess: onConnect});
const teamNumber = 20;
const timeoutObj = {
    'temperature': {},
    'pression': {}
};

function onConnect() {
    console.log("onConnect");
    for (let i = 1; i < teamNumber; i++) {
        if (i < 10){
            client.subscribe(`gti780a2019/equipe0${i}/temperature`);
            client.subscribe(`gti780a2019/equipe0${i}/pression`);
        }
        else {
            client.subscribe(`gti780a2019/equipe${i}/temperature`);
            client.subscribe(`gti780a2019/equipe${i}/pression`);
        }
    }
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
        console.log("onConnectionLost:" + responseObject.errorMessage);
}

function onMessageArrived(message) {
    const cellId = message.destinationName.split('gti780a2019/')[1];
    const teamId = cellId.split('/')[0];
    const sensor = cellId.split('/')[1];
    if (teamId === 'equipe03') {
        if (sensor === "temperature") {
            if (temp.length === 10) {
                temp.splice(0, 1);
            }
            temp.push(parseFloat(message.payloadString).toFixed(2));
            updateTemperature();
        }
        if (sensor === "pression") {
            if (pression.length === 10) {
                pression.splice(0, 1);
            }
            pression.push(parseFloat(message.payloadString).toFixed(2));
            updatePression();
        }
    }

    clearTimeout(timeoutObj[sensor][teamId]);

    document.getElementById(cellId).innerHTML = parseFloat(message.payloadString).toFixed(2);

    timeoutObj[sensor][teamId] = setTimeout(function () {
        document.getElementById(cellId).innerHTML = "";
    }, 10000);
}
