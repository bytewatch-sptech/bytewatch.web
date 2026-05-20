const express = require("express");

const router = express.Router();

const jiraController = require("../controllers/jiraController");


router.get("/dashboard/:fkEmpresa", function (req, res) {
    jiraController.filtrarDashboard(req, res);
});

module.exports = router;