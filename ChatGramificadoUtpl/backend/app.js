'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
const docenteRoutes = require('./routes/docente');
const chatRoutes = require('./routes/chat');
const glosarioRoutes = require('./routes/glosario');
const passport = require('passport');
const morgan = require('morgan');
const app = express();
var http = require('http').createServer(app)
const Mensaje = require('./models/mensaje');

var io = require('socket.io')(http);

const router = express.Router();

//Middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

//CORS
app.use(cors());
io.set('origins', '*:*');

//Rutas
app.use('/api/', docenteRoutes);
app.use('/api/salaChat/', chatRoutes);
app.use('/api/glosario/', glosarioRoutes);

var contadorUsuarios = 0;
const clientes = {};

// contadorUsuarios++;
io.on("connection", (socket) => {

    console.log('Usuario conectado');

    socket.on("message", (m) => {
        // emitir un evento a todos los sockets conectados
        io.emit('message', m);
    });

    socket.on('nuevoRoom', sala => {
        console.log('Nueva sala: ', sala)
        socket.join(sala);
    });
    socket.on('mensaje', (obj) => {
        // obj.message.from.id = socket.id;
        obj.client = socket.id;
        io.in(obj.sala).emit('mensaje', obj.message);

        // console.log(socket.id);
        if (obj.message.content) {
            var mensaje = new Mensaje();
            mensaje.chat = obj.sala;
            mensaje.mensaje = obj.message.content;
            mensaje.username = obj.message.from.name;
            mensaje.avatar =  obj.message.from.avatar;
            mensaje.fecha = new Date();

            mensaje.save(mensaje);
        }


        io.in(obj.sala).clients((err, clients) => {
            io.in(obj.sala).emit('contador', clients);
        });
    });


    socket.on("disconnect", () => {
        console.log('desconectado');
    });


});




module.exports = http;