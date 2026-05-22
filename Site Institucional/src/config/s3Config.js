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


module.exports = { s3Client };