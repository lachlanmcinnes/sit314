var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
    id: Number,
    building: Number,
    level: Number,
}, {collection: 'lightConfig'});

var sensor = mongoose.model('lightConfig',SensorSchema);
module.exports = sensor;