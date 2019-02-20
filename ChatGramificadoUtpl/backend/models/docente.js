'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var DocenteSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

DocenteSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
};

DocenteSchema.methods.isValid = function(hashedPassword){
    return bcrypt.compareSync(hashedPassword, this.password)
};

module.exports = mongoose.model('Docente', DocenteSchema);
