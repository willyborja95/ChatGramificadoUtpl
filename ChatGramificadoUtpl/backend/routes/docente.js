'use strict'

const express = require('express');
const DocenteController = require('../controllers/docente');
const VerificarToken = require('../config/jwtHelper');

const router = express.Router();

router.post('/guardarDocente', DocenteController.guardarDocente);
router.post('/consultarDocenteIngreso', DocenteController.consultarDocenteIngreso);
router.post('/obtenerPerfil', VerificarToken.verificarToken ,DocenteController.obtenerPerfil);

module.exports = router;