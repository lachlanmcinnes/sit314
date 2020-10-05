const mqtt = require('mqtt');
const mongoose = require('mongoose');
const SensorNew = require('./models/sensorNew');

var plotly = require('plotly')("t","t")

//Connect
mongoose.connect('mongodb+srv://t:t1@t.myekw.mongodb.net/SIT314?retryWrites=true&w=majority')

const client = mqtt.connect("mqtt://m13.cloudmqtt.com:16965", {
    username: "t",
    password: "t"
});

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/#');
});

//Prep plotly
var scat1 = {
    x: [],
    y: [],
    type: "scatter",
    name: "moisture"
};

//Establish basic sensor dataframe
const sensordata = {
    id: 0,
    name: "moisturesensor",
    address: "221 Burwood Hwy, Burwood VIC 3125",
    sensorData:[
        {
        time: new Date().getTime(),
        moisture: 20
        }
    ]
}

const low = 10;
const high = 40;
reading = Math.floor(Math.random()*(high-low) + low);
sensordata.sensorData[0].moisture = reading;

//MQTT Broker
client.on('message', (topic, message) => {

    if (topic == '/moisture') {

        const command = JSON.parse(message);
        const sensId = Number(command.id);
        const sensMoist = command.moisture;

        var tracktime = new Date().toISOString()
        scat1.x.push(tracktime);
        scat1.y.push(sensMoist);

        var graphOptions = {
            filename: "moisture",
            fileopt: "overwrite"
        };

        plotly.plot(scat1, graphOptions, function (err, msg) {
            if(err) return console.log(err);
            console.log(msg);
        })

        SensorNew.findOne({"id": sensId}, (err,sensor) => {
            if (err) {
                console.log(err);
            }
            if (sensor == null){
                const newSensor = new SensorNew({
                    id: sensordata.id,
                    name: sensordata.name,
                    address: sensordata.address,
                    sensorData: sensordata.sensordata
                });
                newSensor.save().then(doc => {
                    console.log(doc);
                });
            }else{
                const time = new Date().getTime();
                const moist = sensMoist;

                const { sensorData } = sensor;
                sensorData.push({ time, moist });

                sensor.sensorData = sensorData;

                sensor.save(err => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
});

