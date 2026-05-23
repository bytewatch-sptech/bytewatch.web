var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");


router.get("/exportar", function (req, res) {
    relatorioController.obterRelatorio(req, res);
});

module.exports = router;