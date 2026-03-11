var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrarServidor(req, res) {
  var fkEmpresa = req.body.fkEmpresaServer;
  var nome = req.body.nomeServer;
  var endereco = req.body.enderecoServer;
  var sistemaOperacional = req.body.sistemaOperacionalServer;
  var localizacao = req.body.localizacaoServer;
  var ambiente = req.body.ambienteServer;

  console.log('Entrei no controller')
  console.log(nome, endereco, sistemaOperacional, localizacao, ambiente, fkEmpresa);

    empresaModel.cadastrarServidor(nome, endereco, sistemaOperacional, localizacao, ambiente, fkEmpresa).then((resposta) => {
      console.log('Entrei no controller')
      res.status(201).json(resposta);

    }).catch((erro) => {
      console.log('Erro no controller')
      console.log('Erro no controller: ', erro.sqlMessage)
      res.status(500).json(erro)
    })
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  cadastrarServidor
};
