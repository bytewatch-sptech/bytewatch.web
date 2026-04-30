const { responderPergunta } = require('../../public/js/byteAI');

app.post('pergunta-gemini', async (req, res) => {
    const { pergunta } = req.body;

    try{
        // const contexto = "X coisa X Y item"

        const resposta = await responderPergunta(pergunta);
        res.json({ reposta });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Erro ao chamar IA"})
    }
})