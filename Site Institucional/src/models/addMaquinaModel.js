var database = require("../database/config");

function cadastrar(nome, localizacao, ip, fkEmpresa, tipo, mac_address, componentes) {

  var instrucaoSql = `INSERT INTO servidor (nome, endereco_ip, localizacao, tipo, mac_address, fk_id_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${tipo}', '${mac_address}', '${fkEmpresa}');`;

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
  cadastrar
}
