var s3Service = require("../helpers/bucketS3")

function buscarGestorS3(req, res) {
    var mac = req.params.macAddress

    if(!mac){
        return res.status(400).send("MAC Address é obrigatorio")
    }

    s3Service.obterDadosGestor(mac).then(function (resultado) {
        if(resultado){
            console.log("estou no if do controller")
            res.json(resultado)
        }else{
            res.status(400).json({ mensagem: `Métricas não encontradas para o MAC ${mac}`})
        }
    })
    .catch(function (erro) {
        console.error("Erro no Controller ao buscar o S3 Gestor", erro)
        res.status(500).json({
            mensagem: "Erro no buscar gestor no S3",
            detalhe: erro.message
        })
    })   
}

module.exports = {
    buscarGestorS3
}