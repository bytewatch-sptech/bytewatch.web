const { obterKPIsAlertas } = require("../public/services/s3");

async function buscarKPIs(req, res) {
    try {
        const dados = await obterKPIsAlertas();
        res.status(200).json(dados);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro ao buscar KPIs"
        });
    }
}

module.exports = {
    buscarKPIs
};