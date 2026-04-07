var database = require("../database/config");

function cadastrar(nome, localizacao, ip, fkEmpresa, componentes) {

  var instrucaoSql = `INSERT INTO servidor (nome, endereco_ip, localizacao, fk_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${fkEmpresa}');`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  cadastrar
}
