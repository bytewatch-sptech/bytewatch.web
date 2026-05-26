var express = require("express");

var router = express.Router();

var jiraController = require("../controllers/jiraController");


router.get("/dashboard/:fkEmpresa", function (req, res) {
    jiraController.filtrarDashboard(req, res);
});

module.exports = router;