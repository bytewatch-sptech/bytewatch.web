var database = require("../database/config");

function cadastrar(nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa) {
    console.log("ACESSEI O ANALISTA MODEL \n \n\t\t >> Executando insert na tabela usuario");
    
   var instrucaoSql = `
        INSERT INTO usuario (nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa) 
        VALUES ('${nome}', '${senha}', '${email}', '${cpf}', ${fk_tipo_usuario}, ${fk_usuario_empresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};