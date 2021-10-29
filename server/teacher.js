const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = mongoose.model('Teacher', {
    jobnumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    entrydate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})