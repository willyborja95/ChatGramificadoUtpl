'use strict'

const express = require('express');
const ChatController = require('../controllers/chat');

const router = express.Router();

router.post('/guardarChatListaTerminos', ChatController.guardarChatListaTerminos);
router.post('/guardarSalaChat', ChatController.guardarSalaChat);
router.post('/guardarSalaGrupal', ChatController.guardarSalaGrupal);
router.put('/actualizarSalaChat', ChatController.actualizarSalaChat);
router.post('/listarSalasChat', ChatController.listarSalasChat);
router.post('/obtenerNombreSalaChat', ChatController.obtenerNombreSalaChat);
router.post('/obtenerSalasGrupal', ChatController.obtenerSalasGrupal);
router.post('/obtenerSalaGrupal', ChatController.obtenerSalaGrupal);
router.post('/obtenerMensajes', ChatController.obtenerMensajes);
router.post('/eliminarChatGrupal', ChatController.eliminarChatGrupal);
router.put('/actualizarChatGrupal', ChatController.actualizarChatGrupal);
//router.get('/obtenerSalaChat/:id', ChatController.obtenerSalaChat);
//router.post('/obtenerPerfil', VerificarToken.verificarToken ,DocenteController.obtenerPerfil);

module.exports = router;