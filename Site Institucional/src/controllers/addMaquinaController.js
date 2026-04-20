var addMaquinaModel = require("../models/addMaquinaModel");


function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var localizacao = req.body.localServer;
  var ip = req.body.ipServer;
  var tipo = req.body.tipoServer
  var fkEmpresa = req.body.fkEmpresa
  var mac_address = req.body.mac_addressServer
  var componentes = req.body.componentes



  if (nome == undefined) {
    res.status(400).send("nome está undefined!");
  } else if (localizacao == undefined) {
    res.status(400).send("localização está undefined!");
  } else if(ip == undefined){
    res.status(400).send("ip está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpres está undefined")
  }else if (mac_address == undefined) {
    res.status(400).send("Mac_adress está undefined")
  }else {

    addMaquinaModel.cadastrar(nome, localizacao, ip, fkEmpresa, tipo, mac_address, componentes)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro (estou no controller): ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }


    
  
}

module.exports = {
  cadastrar
}