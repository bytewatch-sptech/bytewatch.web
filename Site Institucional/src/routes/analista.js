var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController")

router.post("/cadastrar", function (req, res){
    analistaController.cadastrar(req, res);
});



module.exports = router;