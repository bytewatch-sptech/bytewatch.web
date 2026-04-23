var express = require("express");
var router = express.Router();

var addMaquinaController = require("../controllers/addMaquinaController");

router.post("/cadastrar", function (req, res) {
  addMaquinaController.cadastrar(req, res);
})

module.exports = router;