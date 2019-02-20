'use strict'

const express = require('express');
const router = express.Router();
const glosario = require('../controllers/glosario');

router.post('/agregarTerminoGlosario', glosario.agregarTerminoGlosario);
router.post('/listarTerminosGlosario', glosario.listarTerminosGlosario);
router.post('/eliminarTerminoGlosario', glosario.eliminarTerminoGlosario);
router.post('/obtenerTermino', glosario.obtenerTermino);
router.put('/actualizarTermino', glosario.actualizarTermino);


/*
router.get('/', glosario.getGlosarios);
router.post('/', glosario.createGlosario);
router.get('/:id', glosario.getGlosario);
router.put('/:id', glosario.editGlosario);
router.delete('/:id', glosario.deleteGlosario);
*/
module.exports = router;
