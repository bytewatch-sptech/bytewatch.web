const jiraService = require("../../public/services/jiraService");

async function filtrarDashboard(req, res) {
    try {
        var fkEmpresa = req.params.fkEmpresa;
        // var fkFuncionario = req.params.fkFuncionario;

        const dados = await jiraService.filtrarDashboard(fkEmpresa);

        res.status(200).json(dados);

    } catch (erro) {
        console.error("Erro no Jira Controller: ", erro);
        res.status(500).json({
            erro: "Erro ao buscar issues"
        });
    }
}

module.exports = {
    filtrarDashboard
};