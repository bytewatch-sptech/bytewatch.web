var s3Service = require("../helpers/bucketS3")

function buscarUsoS3(req, res){
  var mac = req.params.macAddress

  if(!mac){
    return res.status(400).send("MAC Addressé obrigatório")
  }
  s3Service.obterUsoMemoriaRam(mac).then(function (resultado){
    if(resultado){
      res.json(resultado)
    }else{
      res.status(400).json({ mensagem: `Métricas não encontradas para o MAC: ${mac}`})
    }
  })
  .catch(function(erro){
    console.error("Erro no Controller ao buscar o S3",erro)
    res.status(500).json({
      mensagem: "Erro ao buscar dados no S3",
      detalhe: erro.message
    })  
  })
}

module.exports = {
  buscarUsoS3
}