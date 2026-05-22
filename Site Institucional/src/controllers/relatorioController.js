const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../../src/config/s3Config"); 

async function obterRelatorio(req, res) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: "relatorios/relatorio_final_projeto.csv"
    }

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params))
        const conteudoCsv = await Body.transformToString();

        if (!conteudoCsv) {
            return res.status(204).send("Relatório vazio"); 
        }

        res.status(200).json({
            dadosMaquina: conteudoCsv
        });

    } catch (err) {
        console.error("Erro ao buscar os alertas no S3:", err);
        res.status(500).json({ erro: "Erro interno ao buscar relatório" });
    }
}

module.exports = {
    obterRelatorio
}