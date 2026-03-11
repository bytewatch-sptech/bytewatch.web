var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM tipo_usuario WHERE id_usuario = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id_tipo_usuario, tipo FROM tipo_usuario`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

function cadastrarServidor(nome, endereco, sistemaOperacional, localizacao, ambiente, fkEmpresa) {
  console.log('Entrei no model')

  var instrucaoSql = `
  INSERT INTO servidor 
  (nome, endereco_ip, sistema_operacional, localizacao, ambiente, fk_id_empresa)
  VALUES
  ('${nome}', '${endereco}', '${sistemaOperacional}', '${localizacao}', '${ambiente}', '${fkEmpresa}')
  `;
  return database.executar(instrucaoSql);
}

module.exports = { 
  buscarPorCnpj, 
  buscarPorId, 
  cadastrar, 
  listar,
  cadastrarServidor
 };
