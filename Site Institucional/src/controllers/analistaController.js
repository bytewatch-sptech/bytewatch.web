var usuarioModel = require("../models/analistaModel");


function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var senha = req.body.senhaServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var fk_tipo_usuario = req.body.fkUserServer;
    var fk_usuario_empresa = req.body.fkEmpresaServer;

    // Validação simples (opcional, mas recomendada)
    if (nome == undefined || senha == undefined || fk_tipo_usuario == undefined) {
        res.status(400).send("Seus campos estão indefinidos!");
    } else {
        usuarioModel.cadastrar(nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa)
            .then(function (resposta) {
                res.status(201).json(resposta);
            })
            .catch(function (erro) {
                console.log("\nErro ao cadastrar: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar
}
