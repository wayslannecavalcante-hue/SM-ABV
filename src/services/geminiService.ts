import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generatePostArt(prompt: string): Promise<string | null> {
  try {
    const enhancedPrompt = `Crie uma imagem publicitária fotorealista e de alta qualidade para redes sociais de uma associação de proteção veicular. 
    
Direcionamento da arte: ${prompt}. 

DIRETRIZES DE IDENTIDADE VISUAL (MUITO IMPORTANTE):
- A imagem DEVE incorporar a paleta de cores da logomarca da ABV Proteção Veicular: Azul Escuro, Vermelho e Amarelo/Laranja.
- Use essas cores de forma harmônica e estratégica na iluminação (ex: reflexos, luz do sol, luzes de estúdio), nos veículos, no cenário ou nos detalhes da composição.
- O tom visual deve ser profissional, transmitir segurança, confiança e ter um aspecto premium.
- NÃO inclua nenhum texto, letras, palavras ou logotipos escritos na imagem. Apenas a composição visual pura.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
