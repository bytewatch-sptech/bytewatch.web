var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");
var componenteRamController = require("../controllers/componenteRamController");
var componenteCPUController = require("../controllers/componenteCpuController");
var dadosGestorController = require("../controllers/dadosGestorController");


router.post("/cadastrar", function (req, res) {
  servidorController.cadastrar(req, res);
})

router.get("/buscar-datacenters/:id_empresa", (req, res) => {
  servidorController.buscarDatacenters(req, res)
})

router.get("/buscar-todos-servidores", (req, res) => {
  servidorController.buscarTodosServidores(req, res)
})

router.get("/listar-servidores/:id_empresa", (req, res) => {
  servidorController.listarServidores(req, res)
})

router.get("/listarServidoresAnalista/:idEmpresa/:idUsuario", (req, res) => {
  servidorController.listarServidoresAnalista(req, res);
});

router.delete("/remover-servidor/:id_servidor", (req, res) => {
  servidorController.removerServidor(req, res)
})

router.put("/atualizar-servidor", (req, res) => {
  servidorController.atualizarServidor(req, res)
})

router.get("/buscar-nome-servidor/:macAddress", async (req, res) => {
  servidorController.buscarNomeServidor(req, res);   
})

router.get("/uso-s3/:macAddress", async (req, res) => {
  servidorController.buscarUsoS3(req, res);   
})

router.get("/buscarDashboardHome/:idEmpresa/:idUsuario", async (req, res) => {
  servidorController.buscarDashboardHome(req, res);   
})

router.get("/buscar-metricas-ram/:macAddress", async (req, res) => {
  componenteRamController.buscarUsoS3(req, res);   
})

router.get("/buscar-metricas-cpu/:macAddress", async (req, res) => {
  componenteCPUController.buscarUsoCPU(req, res);   
})

router.get("/gestor", (req, res) => {
  dadosGestorController.buscarGestorS3(req, res)
}) 

module.exports = router;