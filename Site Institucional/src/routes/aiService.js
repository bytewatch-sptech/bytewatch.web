var express = require('express');
var router = express.Router()

const { responderPergunta } = require('../../public/js/byteAI');

router.post('/pergunta-gemini', async (req, res) => {
    const { pergunta } = req.body;

    try{
        // const contexto = "X coisa X Y item"

        const resposta = await responderPergunta(pergunta);
        res.json({ resposta });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Erro ao chamar IA"})
    }
})

module.exports = router;