'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MensajeSchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: "Chat",
        required: true
    },
    mensaje: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    fecha: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Mensaje', MensajeSchema);