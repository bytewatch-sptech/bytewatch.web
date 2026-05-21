var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");
var componenteRamController = require("../controllers/componenteRamController");
var dadosGestorController = require("../controllers/dadosGestorController");


router.post("/cadastrar", function (req, res) {
  servidorController.cadastrar(req, res);
})

router.get("/buscar-datacenters/:id_empresa", (req, res) => {
  servidorController.buscarDatacenters(req, res)
})

router.get("/listar-servidores/:id_empresa", (req, res) => {
  servidorController.listarServidores(req, res)
})

router.delete("/remover-servidor/:id_servidor", (req, res) => {
  servidorController.removerServidor(req, res)
})

router.put("/atualizar-servidor", (req, res) => {
  servidorController.atualizarServidor(req, res)
})

router.get("/uso-s3/:macAddress", async (req, res) => {
  servidorController.buscarUsoS3(req, res);   
})

router.get("/buscar-metricas-ram/:macAddress", async (req, res) => {
  componenteRamController.buscarUsoS3(req, res);   
})

router.get("/gestor", (req, res) => {
  dadosGestorController.buscarGestorS3(req, res)
}) 

module.exports = router;