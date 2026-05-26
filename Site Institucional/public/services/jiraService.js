const axios = require("axios"); //axios, uma biblioteca para fazer requisições HTTP

var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env }); // dotenv, carrega variáveis de ambiente (e-mail, token, URL)

var JIRA_EMAIL = process.env.JIRA_EMAIL;
var JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
var JIRA_BASE_URL = process.env.JIRA_BASE_URL;

var servidorModel = require("../../src/models/servidorModel");

async function buscarIssues(fkEmpresa) {
    try {
        var response = await axios.get(
            `${JIRA_BASE_URL}/rest/api/3/search/jql`,
            {
                params: {
                    jql: "created >= startOfDay() ORDER BY created DESC", //A JQL (Jira Query Language) é a linguagem de consulta mais poderosa e flexível que o Jira oferece para buscar issues (tarefas)
                    maxResults: 300,
                    fields: [
                        "summary",
                        "status",
                        "priority",
                        "created",
                        "updated",
                        "resolutiondate",
                        "issuetype",
                        "labels",
                        "assignee"
                    ]
                },
                headers: {
                    Accept: "application/json"
                },
                auth: {
                    username: JIRA_EMAIL,
                    password: JIRA_API_TOKEN
                }
            }
        );

        var incidentes = response.data.issues.map(issue => {
            var labels = issue.fields.labels || [];
            var componentesValidos = [
                "cpu", "ram", "disco", "rede",
            ];

            var componente = labels.find(
                label => componentesValidos.includes(label)
            );

            var servidor = labels.find(
                label => !componentesValidos.includes(label)
            );


            // --- NOME DO ANALISTA ---
            var nomeAnalista = "Não atribuído";
            if (issue.fields.assignee != null) {
                nomeAnalista = issue.fields.assignee.displayName;
            }

            var nomeAnalista = "Não atribuído";

            if (issue.fields.assignee != null) {
                nomeAnalista = issue.fields.assignee.displayName;
            }

            return {
                id: issue.id,
                key: issue.key,
                titulo: issue.fields.summary,
                status: issue.fields.status.name,
                prioridade: issue.fields.priority.name,
                criadoEm: issue.fields.created,
                atualizadoEm: issue.fields.updated,
                resolvidoEm: issue.fields.resolutiondate,
                componente: componente || "desconhecido",
                servidor: servidor,
                labels_crudas: labels,
                analista: nomeAnalista
            };
        });


        console.log("Erros do jira: ", incidentes);

        return incidentes;

    } catch (erro) {
        console.log("Erro Jira:", erro.response?.data || erro.message);
        throw erro;
    }
}

async function filtrarDashboard(fkEmpresa, nomeAnalistaBuscado, macServidorBuscado) {
    var incidentes = await buscarIssues(fkEmpresa);

    if (nomeAnalistaBuscado) {
        var nomeFormatado = nomeAnalistaBuscado.toLowerCase().trim();
        incidentes = incidentes.filter(i =>
            i.analista.toLowerCase().trim() === nomeFormatado
        );
    }

    if (macServidorBuscado) {
        var labelBuscada = "MAC:" + macServidorBuscado;
        incidentes = incidentes.filter(i =>
            i.labels_crudas && i.labels_crudas.includes(labelBuscada)
        );
    }


    var labelsDias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    var contagemAlertas = [0, 0, 0, 0, 0, 0, 0];
    var contagemIncidentes = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < incidentes.length; i++) {
        var incidente = incidentes[i];
        var dataCriacao = new Date(incidente.criadoEm);


        var diaIndex = dataCriacao.getDay();

        if (diaIndex === 0) {
            diaIndex = 6;
        } else {
            diaIndex = diaIndex - 1;
        }


        var ehCritico = false;

        if (incidente.prioridade === "Highest" || incidente.prioridade === "High") {
            ehCritico = true;
        } else {
            var partesDoTitulo = incidente.titulo.split(":");

            if (partesDoTitulo.length > 1) {
                var valorDaPorcentagem = parseFloat(partesDoTitulo[1]);

                if (valorDaPorcentagem >= 90) {
                    ehCritico = true;
                }
            }
        }

        if (ehCritico == true) {
            contagemIncidentes[diaIndex]++;
        } else {
            contagemAlertas[diaIndex]++;
        }
    }

    var ativos = incidentes.filter(
        i => i.status.toUpperCase() !== "FEITO"
    );

    var resolvidos = incidentes.filter(
        i => i.status.toUpperCase() === "FEITO"
    );

    var criticos = incidentes.filter(
        i => i.prioridade == "Highest"
    );

    var altos = incidentes.filter(
        i => i.prioridade == "High"
    );

    var medios = incidentes.filter(
        i => i.prioridade == "Medium"
    );

    var baixos = incidentes.filter(
        i => i.prioridade == "Low"
    );

    // CÁLCULO DO MTTA
    var chamadosEmAndamento = incidentes.filter(
        i => i.status.toUpperCase() === "EM ANÁLISE" || i.status.toUpperCase() === "FAZENDO"
    );

    var somaTempoReconhecimento = 0;

    for (var i = 0; i < chamadosEmAndamento.length; i++) {
        var chamado = chamadosEmAndamento[i];

        var dataCriacao = new Date(chamado.criadoEm);
        var dataAtualizacao = new Date(chamado.atualizadoEm);

        var diferencaMinutos = (dataAtualizacao - dataCriacao) / (1000 * 60);

        somaTempoReconhecimento += diferencaMinutos;
    }

    var mttaCalculado = 0;

    if (chamadosEmAndamento.length > 0) {
        mttaCalculado = (somaTempoReconhecimento / chamadosEmAndamento.length).toFixed(1);
    } else {
        mttaCalculado = 0;
    }


    // CÁLCULO DO MTTR
    var chamadosResolvidos = incidentes.filter(
        i => i.resolvidoEm != null
    );

    var somaTempoResolucao = 0;

    for (var i = 0; i < chamadosResolvidos.length; i++) {
        var chamado = chamadosResolvidos[i];

        var dataCriacao = new Date(chamado.criadoEm);
        var dataResolucao = new Date(chamado.resolvidoEm);

        var diferencaMinutos = (dataResolucao - dataCriacao) / (1000 * 60);
        if (diferencaMinutos < 60) {
            somaTempoResolucao += diferencaMinutos;
        } else {
            var diferencahoras = (dataResolucao - dataCriacao) / (1000 / 60);
            somaTempoResolucao += diferencahoras;
        }



    }

    var mttrCalculado = 0;
    if (chamadosResolvidos.length > 0) {
        mttrCalculado = (somaTempoResolucao / chamadosResolvidos.length).toFixed(1);
    } else {
        mttrCalculado = 0;
    }

    return {
        incidentes: incidentes,
        incidentesAtivos: ativos.length,
        incidentesResolvidos: resolvidos.length,
        criticos: criticos.length,
        altos: altos.length,
        medios: medios.length,
        baixos: baixos.length,
        mtta: mttaCalculado,
        mttr: mttrCalculado,
        graficoBarras: {
            alertas: contagemAlertas,
            incidentes: contagemIncidentes
        }
    };
}

module.exports = {
    buscarIssues,
    filtrarDashboard
};