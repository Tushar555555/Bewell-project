const mongoose = require('mongoose');
const userAuthSchema = require('./userAuthSchema');


const appointementSchema = new mongoose.Schema({
    docdetails : {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
        },
    date : {
        type : Date,
        required : true
    },
    booked : {
        type : Boolean
    },
    time : {
        type : String
    }
    });

module.exports = new mongoose.model('Session', appointementSchema);