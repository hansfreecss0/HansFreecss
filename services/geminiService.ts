
import { GoogleGenAI } from "@google/genai";

export class LinuxTutorService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askTutor(question: string, context: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Kamu adalah tutor Linux senior yang santai dan gaul. 
        Materi saat ini: ${context}. 
        Pertanyaan user: ${question}. 
        Jelaskan dengan singkat, padat, dan gunakan bahasa Indonesia yang mudah dimengerti anak SMK/Kuliahan.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Waduh, koneksi ke tutor AI lagi bermasalah nih. Coba lagi nanti ya!";
    }
  }
}

export const tutorService = new LinuxTutorService();
