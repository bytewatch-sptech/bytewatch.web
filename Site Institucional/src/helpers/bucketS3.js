const { s3Client } = require("../config/s3Config");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = []
        stream.on("data", (chunk) => chunks.push(chunk))
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))

    })

async function obterUsoMemoriaRam(macAddress) {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_ram.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson[macAddress]
        if (!dadosMaquina) return null;

        return {
            macAddress,
            dadosMaquina
        }
    } catch (err) {
        console.error("Erro ao processar componentes:", err)
        throw err;
    }
}

async function obterDadosGestor() {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_gestor.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson
        if (!dadosMaquina) return null;

        return {
            dadosMaquina
        }
    } catch (err) {
        console.error("Erro ao buscar os alertas:", err)
        throw err;
    }
}

async function obterMetricaAlertas() {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_alertas_tela.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson
        if (!dadosMaquina) return null;

        return {
            dadosMaquina
        }
    } catch (err) {
        console.error("Erro ao buscar os alertas:", err)
        throw err;
    }
}

async function obterUsoCpu(macAddress) {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_cpu.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson[macAddress]
        if (!dadosMaquina) return null;

        return {
            macAddress,
            dadosMaquina
        }
    } catch (err) {
        console.error("Erro ao processar componentes:", err)
        throw err;
    }
}

async function obterRelatorio() {
    
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "relatorios/relatorio.csv"
    };

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params));
        const conteudoCsv = await streamToString(Body);
        if (!conteudoCsv) return null;
        
        return {
            dadosMaquina: conteudoCsv 
        };

    } catch (err) {
        console.error("Erro ao buscar o relatório no S3:", err);
        throw err;
    }
}

module.exports = { 
    obterUsoMemoriaRam, 
    obterDadosGestor, 
    obterMetricaAlertas, 
    obterUsoCpu,
    obterRelatorio
 }