const { s3Client } = require("../../src/config/s3Config");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = []
        stream.on("data", (chunk) => chunks.push(chunk))
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    })

async function obterUsoServidor(macAddress) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)


        if (!conteudo || conteudo.trim() === "") return null;

        const bancoDadosJson = JSON.parse(conteudo)
        const dadosMaquina = bancoDadosJson[macAddress]
        if (!dadosMaquina) return null;

        const cpu = dadosMaquina.metricas.find(m => m.tipoDado === "cpu")?.porcentagemCpu || 0;
        const ram = dadosMaquina.metricas.find(m => m.tipoDado === "ram")?.porcentagemRam || 0;
        const disco = dadosMaquina.metricas.find(m => m.tipoDado === "disco")?.porcentagemDisco || 0;

        return {
            macAddress,
            usoAtual: {
                cpu: Math.round(cpu),
                ram: Math.round(ram),
                disco: Math.round(disco)
            }
        }
    } catch (err) {
        console.error("Erro ao processar componentes:", err)
        return null;
    }
}

async function obterKPIsAlertas() {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "trusted/client.json"
    };

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params));
        const conteudo = await streamToString(Body);

        if (!conteudo || conteudo.trim() === "") {
            console.warn("AVISO: Arquivo client.json está vazio no S3.");
            return {
                totalAlertas: 0,
                totalCriticos: 0,
                totalRiscos: 0,
                servidorMaisAlertas: "Nenhum"
            };
        }

        const bancoDadosJson = JSON.parse(conteudo);

        let totalAlertas = 0;
        let totalCriticos = 0;
        let totalRiscos = 0;
        let servidorMaisAlertas = "Nenhum";
        let maiorQtd = 0;

        for (const mac in bancoDadosJson) {
            const maquina = bancoDadosJson[mac];
            const alertas = maquina.alertas || [];

            totalAlertas += alertas.length;

            if (alertas.length > maiorQtd) {
                maiorQtd = alertas.length;
                servidorMaisAlertas = mac;
            }

            alertas.forEach(alerta => {
                if (alerta.nivel === "CRÍTICO") totalCriticos++;
                else if (alerta.nivel === "ALERTA") totalRiscos++;
            });
        }

        return {
            totalAlertas,
            totalCriticos,
            totalRiscos,
            servidorMaisAlertas
        };

    } catch (err) {
        if (err.Code === 'NoSuchKey') {
            console.error("Arquivo client.json não encontrado no S3.");
        } else {
            console.error("Erro ao buscar KPIs:", err);
        }

        return {
            totalAlertas: 0,
            totalCriticos: 0,
            totalRiscos: 0,
            servidorMaisAlertas: "Nenhum"
        };
    }
}

module.exports = { obterUsoServidor, obterKPIsAlertas };