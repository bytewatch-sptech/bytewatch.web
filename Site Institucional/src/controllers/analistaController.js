var usuarioModel = require("../models/analistaModel");


function cadastrar(req, res) {
    var id_usuario = req.body.id_usuarioServer;
    var nome = req.body.nomeServer
    var senha = req.body.senhaServer
    var email = req.body.emailServer
    var cpf = req.body.cpfServer
    var fk_tipo_usuario = req.body.fkUserServer
    var fk_usuario_empresa = req.body.fkEmpresaServer

    console.log('Entrei no controller')
      console.log(id_usuario, nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa);
    
        empresaModel.cadastrarServidor(id_usuario, nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa).then((resposta) => {
          console.log('Entrei no controller')
          res.status(201).json(resposta);
    
        }).catch((erro) => {
          console.log('Erro no controller')
          console.log('Erro no controller: ', erro.sqlMessage)
          res.status(500).json(erro)
        })
}

module.exports = {
    cadastrar
}
