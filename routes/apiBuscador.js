var express = require('express');
var router = express.Router();
let apiBuscadorController = require('../controllers/apiBuscadorController')


/* GET home page. */
router.get('/', apiBuscadorController.getAll)



module.exports = router;
