var express = require("express");
var router = express.Router();
var alertaController = require("../controllers/avisoController");

router.get("/metricas-s3", alertaController.buscarAlertasGerados);

module.exports = router;