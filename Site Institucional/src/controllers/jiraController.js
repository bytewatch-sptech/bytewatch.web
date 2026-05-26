const jiraService = require("../../public/services/jiraService");

async function filtrarDashboard(req, res) {
    try {
        var fkEmpresa = req.params.fkEmpresa;
        var fkFuncionario = req.params.fkFuncionario;

        var nomeAnalistaBuscado = req.query.nomeAnalista;
        var macServidorBuscado = req.query.macServidor;

        const dados = await jiraService.filtrarDashboard(fkEmpresa, nomeAnalistaBuscado, macServidorBuscado);

        res.status(200).json(dados);

    } catch (erro) {
        console.log("Erro no controller filtrarDashboard: ", erro);
        res.status(500).json({
            erro: "Erro ao buscar issues"
        });

    }
}

module.exports = {
    filtrarDashboard
};