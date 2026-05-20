const axios = require("axios");

var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;

const servidorModel = require("../../src/models/servidorModel");

async function buscarIssues(fkEmpresa) {
    try {
        const response = await axios.get(
            `${JIRA_BASE_URL}/rest/api/3/search/jql`,
            {
                params: {
                    jql: "created >= -365d ORDER BY created DESC",
                    // Passando os campos como uma única string para evitar quebra na URL
                    fields: "summary,status,priority,created,resolutiondate,issuetype,labels"
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

        const incidentes = response.data.issues.map(issue => {
            const labels = issue.fields.labels || [];
            const componentesValidos = [
                "cpu", "ram", "disco", "rede",
            ];

            const componente = labels.find(
                label => componentesValidos.includes(label)
            );

            const servidor = labels.find(
                label => !componentesValidos.includes(label)
            );

            return {
                id: issue.id,
                key: issue.key,
                titulo: issue.fields.summary,
                status: issue.fields.status.name,
                prioridade: issue.fields.priority.name,
                criadoEm: issue.fields.created,
                resolvidoEm: issue.fields.resolutiondate,
                componente: componente || "desconhecido",
                servidor: servidor || "desconhecido",
                labels_crudas: labels // <-- Para vermos a label original
            };
        });


        console.log("=== DADOS CRUS DO JIRA ===", incidentes);

        return incidentes;

    } catch (erro) {
        console.log("Erro Jira:", erro.response?.data || erro.message);
        throw erro;
    }
}

async function filtrarDashboard(fkEmpresa) {
    const incidentes = await buscarIssues(fkEmpresa);

    var ativos = incidentes.filter(
        i => i.resolvidoEm == null
    );

    var resolvidos = incidentes.filter(
        i => i.resolvidoEm != null
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

    return {
        incidentes: incidentes,
        incidentesAtivos: ativos.length,
        incidentesResolvidos: resolvidos.length,
        criticos: criticos.length,
        altos: altos.length,
        medios: medios.length,
        baixos: baixos.length
    };
}

module.exports = {
    buscarIssues,
    filtrarDashboard
};