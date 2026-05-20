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
const cors = require('cors'); // Importante para permitir que o seu front-end acesse a API
const { buscarIssues } = require('./caminho/para/o/seu/jiraService');

const app = express();

// Configurações básicas do Express
app.use(express.json());
app.use(cors());

// Rota GET para buscar os incidentes filtrados
// Usamos :fkEmpresa e :fkFuncionario como parâmetros dinâmicos na URL
app.get('/api/incidentes/:fkEmpresa/', async (req, res) => {

    // 1. Captura os IDs que vieram na URL
    const idEmpresa = req.params.fkEmpresa;

    console.log(`Recebida requisição de incidentes - Empresa: ${idEmpresa}`);

    try {
        // 2. Chama a sua função do service passando os parâmetros na ordem correta
        const incidentes = await buscarIssues(idEmpresa);

        // 3. (Opcional) Se não encontrar nada, retorna status 204 (No Content)
        if (!incidentes || incidentes.length === 0) {
            return res.status(204).send();
        }

        // 4. Retorna a lista de incidentes em formato JSON com status 200 (OK)
        return res.status(200).json(incidentes);

    } catch (erro) {
        // 5. Tratamento de erro da requisição
        console.error("Erro na rota de incidentes:", erro.message);

        return res.status(500).json({
            erro: "Falha ao buscar incidentes no Jira.",
            detalhes: erro.message
        });
    }
});

// Inicialização do servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = router;