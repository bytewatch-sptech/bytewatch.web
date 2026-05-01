var database = require("../database/config");

function removerServidor(id_servidor) {
  var instrucaoSql = `DELETE FROM servidor WHERE id_servidor = ${id_servidor};
`
  return database.executar(instrucaoSql)
}

function listarServidores(id_empresa) {
  var instrucaoSql = `SELECT id_servidor, CONCAT(s.nome, " — ", z.codigo_zona) AS "nome_datacenters" FROM datacenter AS d 
	  JOIN servidor AS s ON fk_datacenter = id_datacenter
    JOIN zona_disponibilidade AS z ON fk_zona_disponibilidade = id_zona_disponibilidade
    WHERE fk_id_empresa = ${id_empresa};
`
  return database.executar(instrucaoSql)
}

function buscarDatacenters(id_empresa) {
  var instrucaoSql = `SELECT id_datacenter, CONCAT(d.nome, " — ", z.codigo_zona) AS "nome_datacenters" FROM datacenter AS d 
	JOIN servidor AS s ON fk_datacenter = id_datacenter
    JOIN zona_disponibilidade AS z ON fk_zona_disponibilidade = id_zona_disponibilidade
    WHERE fk_id_empresa = ${id_empresa} GROUP BY d.nome;
`
  return database.executar(instrucaoSql)
}

function cadastrar(nome, localizacao, ip, fkEmpresa, tipo, mac_address, componentes) {

  var instrucaoSql = `INSERT INTO servidor (nome, endereco_ip, fk_datacenter, tipo, mac_address, fk_id_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${tipo}', '${mac_address}', '${fkEmpresa}');`;

  return database.executar(instrucaoSql).then(function (resultadoServidor) {
    var idServidor = resultadoServidor.insertId;
    var promessas = [];

    var idServidor = resultadoServidor.insertId;

    if (!idServidor) {
      console.error("Erro: Não foi possível obter o ID do servidor inserido.");
      return;
    }

    var promessas = [];
    for (var i = 0; i < componentes.length; i++) {
      var compo = componentes[i];
      var sqlComp = `INSERT INTO componente_servidor (fk_id_servidor, fk_id_componente, capacidade_limite, limite_alerta) 
                       VALUES (${idServidor}, ${compo.idComponente}, ${compo.capacidade_limite}, ${compo.limiteAlerta});`;

      promessas.push(database.executar(sqlComp));
    }
    return Promise.all(promessas);
  });
y
}



module.exports = {
  cadastrar,
  buscarDatacenters,
  listarServidores,
  removerServidor
}
