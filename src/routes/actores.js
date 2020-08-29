var express = require('express');
var router = express.Router();
let db = require('../database/models')
let actoresController = require('../controllers/actoresController')


/* GET home page. */
router.get('/', actoresController.all)

router.get('/filter/:letra', actoresController.filter)

router.get('/crear', actoresController.crear)

router.post('/crear', actoresController.crearAdd)

router.get('/detalle/:id', actoresController.detalle)

router.get('/edit/:id', actoresController.edit)
router.put('/edit/:id', actoresController.editSave)

router.put('/delete/:id', actoresController.delete)

router.get('/eliminados', actoresController.verEliminados)
router.post('/recuperar/:id', actoresController.recuperarEliminados)
//router.delete('/deletesave/:id', actoresController.deleteSave)


module.exports = router;
