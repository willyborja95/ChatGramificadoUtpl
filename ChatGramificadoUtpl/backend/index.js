'use strict'

const mongoose = require('mongoose');
const http = require('./app');
const port = 3000;

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost:27017/chatUtpl')
    .then(() => {
        console.log('Conectado a MongoDB exitosamente ');
        //Server
        http.listen(port, () => {
            console.log('Servidor web ejecutándose en el puerto 3000');
        });
    })
    .catch(err => console.log(err));
