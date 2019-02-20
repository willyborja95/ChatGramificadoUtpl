'use strict'
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const Chat = mongoose.model('Chat');

var GlosarioSchema = new Schema({
    chat: { 
        type: Schema.ObjectId, 
        ref: "Chat",
        required: true
    },
    termino: {
        type: String,
        required: true
    },
    descripcion: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('Glosario', GlosarioSchema);
