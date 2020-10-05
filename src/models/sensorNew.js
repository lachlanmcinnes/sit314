var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    address: String,
    sensorData: Array
}, {collection: 'SensorNew'});

var sensor = mongoose.model('SensorNew',SensorSchema);
module.exports = sensor;