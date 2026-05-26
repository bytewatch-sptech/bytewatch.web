const { s3Client } = require("../../src/config/s3Config");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = []
        stream.on("data", (chunk) => chunks.push(chunk))
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    })

async function obterDashboardEquipe() {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "client/dashboard_equipe_tela.json"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params));
        const conteudo = await streamToString(Body);

        return JSON.parse(conteudo);

    } catch (err) {
        console.error("Erro ao buscar dashboard da equipe no S3:", err);
        throw err;
    }
}

module.exports = { obterDashboardEquipe }