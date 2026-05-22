var express = require("express");
var router = express.Router();

router.use(express.json());

router.post("/api/jira/resolvido", (req, res) => {
    try {
        const payload = req.body;
        const ticketKey = payload.issue ? payload.issue.key : "Desconhecido";
        const statusFinal = payload.issue ? payload.issue.fields.status.name : "Desconhecido";

        console.log(`ID do Ticket: ${ticketKey}`);
        console.log(`Status Atual: ${statusFinal}`);

        res.status(200).json({ message: "Webhook recebido!" });
    } catch (error) {
        console.error("Erro no webhook:", error);
        res.status(500).json({ error: "Erro interno" });
    }
});

router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;