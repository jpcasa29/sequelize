var express = require('express');
var router = express.Router();
let buscadorController = require('../controllers/buscadorController')


/* GET home page. */
router.get('/', buscadorController.index)



module.exports = router;
