var express = require("express");
var router = express.Router();

var analistaController = require("../controllers/analistaController")

router.post("/cadastrar", function (req, res){
    analistaController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res){
    analistaController.autenticar(req, res);
});

module.exports = router;