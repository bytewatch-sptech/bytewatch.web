const { s3Client } = require("../../src/config/s3Config"); 
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = []
        stream.on("data", (chunk) => chunks.push(chunk))
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))

    })

async function obterDadosS3() {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/client.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        return JSON.parse(conteudo);
    } catch(err) {
        console.error("Erro ao puxar dados do S3:", err)
        throw err;
    }
}


async function obterUsoServidor(macAddress) {

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/client.json"
    }

    try{
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudo = await streamToString(Body)
        const bancoDadosJson = JSON.parse(conteudo)

        const dadosMaquina = bancoDadosJson[macAddress]
        if(!dadosMaquina)return null;
        
        const cpu = dadosMaquina.metricas.find(m => m.tipoDado === "cpu")?.porcentagemCpu || 0;
        const ram = dadosMaquina.metricas.find(m => m.tipoDado === "ram")?.porcentagemRam || 0;
        const disco = dadosMaquina.metricas.find(m => m.tipoDado === "disco")?.porcentagemDisco || 0;

        return{
            macAddress,
            usoAtual: {
                cpu: Math.round(cpu),
                ram: Math.round(ram),
                disco: Math.round(disco)
            }
        }
    }catch(err){
        console.error("Erro ao processar componentes:", err)
        throw err;
    }
}


module.exports = { obterDadosS3, obterUsoServidor }