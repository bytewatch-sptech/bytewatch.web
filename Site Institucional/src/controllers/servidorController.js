var servidorModel = require("../models/servidorModel");

async function atualizarServidor(req, res) {
  const { nome, endereco_ip, status, mac_address, id_servidor } = req.body;

  if (!nome || !endereco_ip || !status || !mac_address || !id_servidor) {
    res.status(400).json("Preencha todos os campos");
  }

  const resultado = await servidorModel.atualizarServidor(
    nome,
    endereco_ip,
    status,
    mac_address,
    id_servidor
  );
  res.status(200).json(resultado);
}

async function buscarNomeServidor(req, res) {
  var mac = req.params.macAddress;

  if (!mac) {
    return res.status(400).send("MAC Addressé obrigatório");
  }
  const resultado = await servidorModel.buscarNomeServidor(mac);
  res.status(200).json(resultado);
}

async function buscarDatacenters(req, res) {
  const { id_empresa } = req.params;

  if (!id_empresa) {
    res.status(400).json("Id empresa invalido!");
  }

  const resultado = await servidorModel.buscarDatacenters(id_empresa);
  res.status(200).json(resultado);
}

async function buscarTodosServidores(req, res) {
  
  const resultado = await servidorModel.buscarServidores();
  res.status(200).json(resultado);
}

async function removerServidor(req, res) {
  const { id_servidor } = req.params;

  if (!id_servidor) {
    res.status(400).json("Id servidor invalido!");
  }

  const resultado = await servidorModel.removerServidor(id_servidor);
  res.status(200).json(resultado);
}

async function listarServidores(req, res) {
  const { id_empresa } = req.params;

  if (!id_empresa) {
    res.status(400).json("Id empresa invalido!");
  }

  const resultado = await servidorModel.listarServidores(id_empresa);
  res.status(200).json(resultado);
}

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var localizacao = req.body.localServer;
  var ip = req.body.ipServer;
  var tipo = req.body.tipoServer;
  var fkEmpresa = req.body.fkEmpresa;
  var mac_address = req.body.macServer;
  var componentes = req.body.componentesServer;

  if (nome == undefined) {
    res.status(400).send("nome está undefined!");
  } else if (localizacao == undefined) {
    res.status(400).send("localização está undefined!");
  } else if (ip == undefined) {
    res.status(400).send("ip está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpres está undefined");
  } else if (mac_address == undefined) {
    res.status(400).send("Mac_adress está undefined");
  } else {
    servidorModel
      .cadastrar(
        nome,
        localizacao,
        ip,
        fkEmpresa,
        tipo,
        mac_address,
        componentes
      )
      .then((resultado) => {
        res.status(201).json(resultado);
      })
      .catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro (estou no controller): ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

var s3Service = require("../../public/services/s3Home");

function buscarUsoS3(req, res) {
  var mac = req.params.macAddress;

  if (!mac) {
    return res.status(400).send("MAC Addressé obrigatório");
  }
  s3Service
    .obterUsoServidor(mac)
    .then(function (resultado) {
      if (resultado) {
        res.json(resultado);
      } else {
        res
          .status(400)
          .json({ mensagem: `Métricas não encontradas para o MAC: ${mac}` });
      }
    })
    .catch(function (erro) {
      console.error("Erro no Controller ao buscar o S3", erro);
      res.status(500).json({
        mensagem: "Erro ao buscar dados no S3",
        detalhe: erro.message,
      });
    });
}
async function buscarDashboardHome(req, res) {
  const idEmpresa = req.params.idEmpresa || req.params.id_empresa;
  const idUsuario = req.params.idUsuario;
  console.log(idUsuario)
  if (!idEmpresa || !idUsuario) {
    return res
      .status(400)
      .json({ erro: "ID da empresa ou do usuário não fornecidos." });
  }

  try {
    const resultadoServidor = await servidorModel.listarServidoresAnalista(idEmpresa, idUsuario);
    const servidoresCadastrados = resultadoServidor;

    if (servidoresCadastrados.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum server cadastrado" });
    }

    const dadosS3 = await s3Service.obterDadosS3();
    const frotaS3 = dadosS3.frota_servidores;

    const servidoresValidos = servidoresCadastrados.map((servidorDB) => {
      const metricasS3 = frotaS3.find(
        (s) => s.macAddress === servidorDB.mac_address
      );

      return {
        id_servidor: servidorDB.id_servidor,
        nome_db: servidorDB.nome_servidor,
        mac_address: servidorDB.mac_address,
        endereco_ip: servidorDB.endereco_ip,
        idEmpresa: idEmpresa,
        dados_tempo_real: metricasS3 ? metricasS3 : null,
      };
    });

    res.status(200).json({
      resumo_global: dadosS3.resumo_global,
      servidores: servidoresValidos,
    });
  } catch (erro) {
    console.error("erro na integração do Banco e S3", erro);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

module.exports = {
  buscarDashboardHome,
  cadastrar,
  buscarDatacenters,
  listarServidores,
  removerServidor,
  atualizarServidor,
  buscarNomeServidor,
  buscarUsoS3,
  buscarTodosServidores
};
