var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

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

router.get("/buscarDashboardHome/:idEmpresa", async (req, res) => {
  servidorController.buscarDashboardHome(req, res);   
})

module.exports = router;