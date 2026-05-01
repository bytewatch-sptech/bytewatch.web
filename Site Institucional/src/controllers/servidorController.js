var servidorModel = require("../models/servidorModel");


async function buscarDatacenters(req, res) {
  const { id_empresa } = req.params

  if (!id_empresa) {
    res.status(400).json("Id empresa invalido!")
  }

  const resultado = await servidorModel.buscarDatacenters(id_empresa)
  res.status(200).json(resultado)
}

async function removerServidor(req, res) {
  const { id_servidor } = req.params

  if (!id_servidor) {
    res.status(400).json("Id servidor invalido!")
  }

  const resultado = await servidorModel.removerServidor(id_servidor)
  res.status(200).json(resultado)
}

async function listarServidores(req, res) {
  const { id_empresa } = req.params

  if (!id_empresa) {
    res.status(400).json("Id empresa invalido!")
  }

  const resultado = await servidorModel.listarServidores(id_empresa)
  res.status(200).json(resultado)
}

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var localizacao = req.body.localServer;
  var ip = req.body.ipServer;
  var tipo = req.body.tipoServer
  var fkEmpresa = req.body.fkEmpresa
  var mac_address = req.body.macServer
  var componentes = req.body.componentesServer



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

    servidorModel.cadastrar(nome, localizacao, ip, fkEmpresa, tipo, mac_address, componentes)
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
  cadastrar,
  buscarDatacenters,
  listarServidores,
  removerServidor
}