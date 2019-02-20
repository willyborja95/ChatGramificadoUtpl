'use strict'

const mongoose = require('mongoose');
const Docente = mongoose.model('Docente');
const Schema = mongoose.Schema;

var ChatSchema = new Schema({
    docente: { 
        type: Schema.ObjectId, 
        ref: "Docente",
        required: true
    },
    nombreChat: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Chat', ChatSchema);
