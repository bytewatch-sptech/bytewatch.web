const express = require('express');
const router = express.Router();

const { obterDashboardEquipe } = require('../../public/services/serviceAlertaGestor');


router.get('/dashboard/equipe', async (req, res) => {
    try {
        const dadosDashboard = await obterDashboardEquipe();
        res.status(200).json(dadosDashboard);
    } catch (error) {
        res.status(500).json({ erro: "Falha ao carregar os dados" });
    }
});

module.exports = router;