require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function responderPergunta(pergunta, dadosContexto) {
  // Você pode configurar o "System Instruction" para que a IA aja como um analista do ByteWatch
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "Você é um assistente técnico do projeto ByteWatch. Analise os logs e dados de infraestrutura fornecidos e responda de forma clara e profissional."
  });

  // Montando o prompt com os dados reais do seu monitoramento
  const prompt = `Contexto do servidor: ${JSON.stringify(dadosContexto)}. Pergunta do usuário: ${pergunta}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao chamar o Gemini:", error);
    return "Desculpe, não consegui processar sua solicitação no momento.";
  }
}

module.exports = { responderPergunta };