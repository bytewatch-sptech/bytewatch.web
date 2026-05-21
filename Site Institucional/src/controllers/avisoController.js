var alertaService = require("../helpers/bucketS3")

async function buscarAlertasGerados(req, res){
    try {
        var resultado = await alertaService.obterMetricaAlertas();

        if (!resultado || !resultado.dadosMaquina){
            return res.status(204).send();
        }
        return res.status(200).json(resultado.dadosMaquina);
    } 
    catch (error){
        console.error("Erro ao coletar as métricas de alerta", error);
        return res.status(500).json({
            mensagem: "Erro ao processar as métricas da dashboard",
            erro: error.message
        });
    }
}

module.exports = {
  buscarAlertasGerados
}