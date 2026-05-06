require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function responderPergunta(pergunta) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: pergunta
    });
    
    return response.text;
  } catch (error) {
    console.error("Erro na Byte AI:", error);
  }
}

module.exports = { responderPergunta };