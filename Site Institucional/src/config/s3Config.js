require('dotenv').config(); // Garante que o .env seja lido
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

async function testar() {
    console.log("Tentando conectar ao bucket:", process.env.S3_BUCKET_NAME);
    try {
        // CORREÇÃO: Usando s3Client (mesmo nome da const acima) e GetObjectCommand
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: "client/client.json" 
        }));
        console.log("SUCESSO: Conexão com S3 estabelecida e arquivo encontrado!");
    } catch (err) {
        // Se o token estiver expirado, o erro aparecerá aqui
        console.error("ERRO REAL DA AWS:", err.name, err.message);
    }
}

testar();

module.exports = { s3Client };