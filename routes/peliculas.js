var express = require('express');
var router = express.Router();
let db = require('../database/models')
let peliculasController = require('../controllers/peliculasController')


/* GET home page. */
router.get('/', peliculasController.all)

router.get('/filter/:letra', peliculasController.filter)

router.get('/crear', peliculasController.crear)

router.post('/crear', peliculasController.crearAdd)

router.get('/detalle/:id', peliculasController.detalle)

router.get('/edit/:id', peliculasController.edit)
router.put('/edit/:id', peliculasController.editSave)

router.put('/delete/:id', peliculasController.delete)

router.get('/eliminadas', peliculasController.verEliminadas)
router.post('/recuperar/:id', peliculasController.recuperarEliminadas)
router.delete('/deletesave/:id', peliculasController.deleteSave)


module.exports = router;
