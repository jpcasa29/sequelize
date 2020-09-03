const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
let db = require('../database/models')
let peliculasController = require('../controllers/peliculasController')

var storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, 'public/images/movies/')
        },
        filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    
    var upload = multer({storage:storage});
    



/* GET home page. */
router.get('/', peliculasController.all)

router.get('/filter/:letra', peliculasController.filter)

router.get('/crear', peliculasController.crear)

router.post('/crear', upload.any(), peliculasController.crearAdd)

router.get('/detalle/:id', peliculasController.detalle)

router.get('/edit/:id', peliculasController.edit)
router.put('/edit/:id', peliculasController.editSave)

router.put('/delete/:id', peliculasController.delete)

router.get('/eliminadas', peliculasController.verEliminadas)
router.post('/recuperar/:id', peliculasController.recuperarEliminadas)
router.delete('/deletesave/:id', peliculasController.deleteSave)


module.exports = router;
