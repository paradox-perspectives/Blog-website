const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: String,
    date: {
        type: String,
        required: true
    },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
