var express = require("express");
var router = express.Router();

router.use(express.json());

router.post("/api/jira/teste", (req, res) => {
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

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { buscarIssues } = require('./public/services/jiraService');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/incidentes/:fkEmpresa', async (req, res) => {

    const idEmpresa = req.params.fkEmpresa;

    console.log(`Recebida requisição de incidentes - Empresa: ${idEmpresa}`);

    try {
        const incidentes = await buscarIssues(idEmpresa);

        if (!incidentes || incidentes.length === 0) {
            return res.status(204).send();
        }

        return res.status(200).json(incidentes);

    } catch (erro) {
        console.error("Erro na rota de incidentes:", erro.message);

        return res.status(500).json({
            erro: "Falha ao buscar incidentes no Jira.",
            detalhes: erro.message
        });
    }
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = router;