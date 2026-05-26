const express = require('express');
const router = express.Router();
// Trazendo a função com o nome novo
const { obterDashboardEquipe } = require('../../public/services/serviceAlertaGestor');

// CORREÇÃO 2: A rota agora se chama /dashboard/equipe
router.get('/dashboard/equipe', async (req, res) => {
    try {
        const dadosDashboard = await obterDashboardEquipe();
        res.status(200).json(dadosDashboard);
    } catch (error) {
        res.status(500).json({ erro: "Falha ao carregar os dados" });
    }
});

module.exports = router;