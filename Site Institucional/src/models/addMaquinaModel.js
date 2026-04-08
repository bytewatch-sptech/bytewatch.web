var database = require("../database/config");

function cadastrar(nome, localizacao, ip, fkEmpresa, componentes) {

  var instrucaoSql = `INSERT INTO servidor (nome, endereco_ip, localizacao, fk_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${fkEmpresa}');`;

  return database.executar(instrucaoSql).then(function (resultadoServidor) {
        var idServidor = resultadoServidor.insertId;
        var promessas = [];

    for (var i = 0; i < componentes.length; i++) {
      var compo = componentes[i];

      if (compo.qtd > 0) {
        var sqlComp = `INSERT INTO componente_servidor (fk_id_servidor, fk_id_empresa, fk_id_componente, limite) 
                               VALUES ('${idServidor}', '${idEmpresa}', '${compo.idComponente}', '${compo.qtd}')`

        var sqlAlerta = `INSERT INTO parametro_alerta (nivel, valor_limite, fk_id_servidor, fk_id_empresa, fk_id_componente) 
                               VALUES ('Crítico', ${comp.limiteAlerta}, ${idServidor}, ${idEmpresa}, ${comp.idComponente})`;

        promessas.push(database.executar(sqlComp));
        promessas.push(database.executar(sqlAlerta));
      }
    }
  })
}


module.exports = {
  cadastrar
}
