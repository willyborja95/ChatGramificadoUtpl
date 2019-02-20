'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GrupalSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: "Chat",
        required: true
    },
    nombre: {
        type: String,
        required: false
    },
    numero: {
        type: Number,
        required: false
    },
    fecha: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Grupal', GrupalSchema);
