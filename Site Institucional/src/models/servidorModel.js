var database = require("../database/config");

function atualizarServidor(
  nome,
  endereco_ip,
  status,
  mac_address,
  id_servidor
) {
  var instrucaoSql = `UPDATE servidor 
                      SET nome = '${nome}',
                          endereco_ip = '${endereco_ip}',
                          status = '${status}',
                          mac_address = '${mac_address}'
                      WHERE id_servidor = '${id_servidor}';
`;
  return database.executar(instrucaoSql);
}

function buscarNomeServidor(mac_address) {
  var instrucaoSql = `SELECT CONCAT(s.nome, " ",  r.nome) AS nome_servidor, CONCAT(pais, ", ", estado) AS localizacao  FROM regiao AS r JOIN zona_disponibilidade ON id_regiao = fk_regiao
	JOIN datacenter ON id_zona_disponibilidade = fk_zona_disponibilidade
    JOIN servidor AS s ON id_datacenter = fk_datacenter WHERE mac_address = '${mac_address}';`;

  return database.executar(instrucaoSql);
}

function removerServidor(id_servidor) {
  var instrucaoSql = `DELETE FROM servidor WHERE id_servidor = '${id_servidor}';
`;
  return database.executar(instrucaoSql);
}

function listarServidores(id_empresa) {
  var instrucaoSql = `SELECT id_servidor, s.mac_address, CONCAT(s.nome, " — ", z.codigo_zona) AS "nome_servidor" FROM datacenter AS d 
	  JOIN servidor AS s ON fk_datacenter = id_datacenter
    JOIN zona_disponibilidade AS z ON fk_zona_disponibilidade = id_zona_disponibilidade
    WHERE fk_id_empresa = ${id_empresa};
`;
  return database.executar(instrucaoSql);
}

function listarServidoresAnalista(idEmpresa, idUsuario) {
  var instrucaoSql = `
    SELECT 
      s.id_servidor, 
      s.mac_address, 
      CONCAT(s.nome, " — ", z.codigo_zona) AS "nome_servidor" 
    FROM datacenter AS d 
    JOIN servidor AS s 
      ON s.fk_datacenter = d.id_datacenter 
    JOIN zona_disponibilidade AS z 
      ON d.fk_zona_disponibilidade = z.id_zona_disponibilidade
    JOIN responsavel AS r 
      ON r.fk_id_servidor = s.id_servidor 
    WHERE s.fk_id_empresa = ${idEmpresa} 
    AND r.fk_id_usuario = ${idUsuario};
  `;
  return database.executar(instrucaoSql);
}

function buscarDatacenters(id_empresa) {
  var instrucaoSql = `SELECT id_datacenter, CONCAT(d.nome, " — ", z.codigo_zona) AS "nome_datacenters" FROM datacenter AS d 
    JOIN zona_disponibilidade AS z ON fk_zona_disponibilidade = id_zona_disponibilidade;
`;
  return database.executar(instrucaoSql);
}

function cadastrar(
  nome,
  localizacao,
  ip,
  fkEmpresa,
  tipo,
  mac_address,
  componentes
) {
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
}

module.exports = {
  listarServidoresAnalista,
  cadastrar,
  buscarDatacenters,
  listarServidores,
  removerServidor,
  atualizarServidor,
  buscarNomeServidor,
};
