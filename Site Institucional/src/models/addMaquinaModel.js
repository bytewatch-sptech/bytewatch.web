var database = require("../database/config");

function cadastrar(nome, localizacao, ip, fkEmpresa, componentes) {

  var instrucaoSql = `INSERT INTO servidor (nome, endereco_ip, localizacao, fk_empresa) VALUES ('${nome}', '${ip}', '${localizacao}', '${fkEmpresa}');`;

  return database.executar(instrucaoSql).then(function (resultadoServidor) {
        var idServidor = resultadoServidor.insertId;
        var promessas = [];

    for (var i = 0; i < componentes.length; i++) {
      var compo = componentes[i];

      if (compo.qtd > 0) {
        var sqlComp = `INSERT INTO componente_servidor (fk_servidor, fk_empresa_componente, fk_componente_servidores) 
                               VALUES ('${idServidor}', '${fkEmpresa}', '${compo.idComponente}');`

        var sqlAlerta = `INSERT INTO parametro_alerta (nivel, valor_limite, fk_id_servidor, fk_id_empresa, fk_id_componente) 
                               VALUES ('Crítico', '${compo.limiteAlerta}', '${idServidor}', '${fkEmpresa}', '${compo.idComponente}');`;

        promessas.push(database.executar(sqlComp));
        promessas.push(database.executar(sqlAlerta));
        
        console.log(sqlAlerta + "//" + sqlComp)
      }
    }
    return Promise.all(promessas);
  })
}


module.exports = {
  cadastrar
}
