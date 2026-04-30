var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.post("/cadastrar", function (req, res) {
  servidorController.cadastrar(req, res);
})

router.get("/buscar-datacenters/:id_empresa", (req, res) => {
  servidorController.buscarDatacenters(req, res)
})

module.exports = router;