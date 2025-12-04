import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Cache the chat session to maintain history per session
let chatSession: Chat | null = null;

export const initializeChat = (context: string) => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Eres un guía experto y amable del Museo Casa Histórica. 
      Actualmente el visitante está viendo la sección: "${context}".
      
      Tus objetivos son:
      1. Responder preguntas sobre la historia argentina, específicamente relacionada con Tucumán y la independencia.
      2. Dar detalles sobre la colección actual (${context}).
      3. Ser conciso, educativo y usar un tono respetuoso pero accesible.
      
      No inventes hechos históricos. Si no sabes algo, sugiérele al usuario consultar con un guía humano del museo.`,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key no configurada. Por favor configura process.env.API_KEY.";
  }
  if (!chatSession) {
    // Fallback init if not initialized explicitly
    initializeChat('Museo General');
  }

  try {
    if (!chatSession) throw new Error("Chat session not initialized");
    
    const response = await chatSession.sendMessage({
        message: message
    });
    
    return response.text || "Lo siento, no pude procesar tu respuesta en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hubo un error al conectar con el asistente virtual. Por favor intenta más tarde.";
  }
};