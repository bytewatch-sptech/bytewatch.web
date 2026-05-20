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

    try{
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson[macAddress]
        if(!dadosMaquina)return null;
        
        return{
            macAddress,
            dadosMaquina
        }
    }catch(err){
        console.error("Erro ao processar componentes:", err)
        throw err;
    }
}

async function obterDadosGestor(macAddress) {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_gestor.json"
    }

    try{
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson[macAddress]
        if(!dadosMaquina)return null;
        
        return{
            macAddress,
            dadosMaquina
        }
    }catch(err){
        console.error("Erro ao processar componentes:", err)
        throw err;
    }
}

module.exports = { obterUsoMemoriaRam }