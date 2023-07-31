var express = require('express');
const indexController = require("../controllers/indexController");
var router = express.Router();

//reta base del archivo localhost:300

/* GET home page. */
//localhost:300
router.get('/',indexController.viewHome);

module.exports = router;
