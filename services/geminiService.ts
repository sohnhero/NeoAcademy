
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Ask the AI tutor a question based on the provided context.
 * Uses gemini-3-flash-preview for general technical support.
 */
export const askTutor = async (question: string, context?: string, customContext?: string) => {
  try {
    const systemInstruction = customContext
      ? `INSTRUCTION SYSTÈME CUSTOM : ${customContext}\n\nContexte Standard : ${context}`
      : `Tu es le "Tuteur Neural" de NeoAcademy AI, un LMS Web3 haut de gamme. 
                 Ton ton est sophistiqué, technique et encourageant. 
                 Tu aides les apprenants à combler le fossé entre la théorie abstraite de la blockchain et l'implémentation pratique.
                 
                 CONTEXTE (Module Actuel) : ${context || 'Apprentissage Web3 Général'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${systemInstruction}
                 REQUÊTE UTILISATEUR : ${question}
                 
                 INSTRUCTIONS :
                 1. Utilise une terminologie technique professionnelle en FRANÇAIS (ex: mentionne "trie d'état", "objets binaires larges", "stockage éphémère" si approprié).
                 2. Fournis des extraits de code en Solidity ou Rust si cela aide à clarifier la logique.
                 3. Garde un formatage propre avec des en-têtes et des listes markdown.
                 4. Si l'utilisateur pose une question non technique, redirige-le poliment vers le parcours d'apprentissage.
                 5. RÉPONDS EXCLUSIVEMENT EN FRANÇAIS.`,
      config: {
        temperature: 0.4,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
    });
    // The response.text property directly returns the generated string.
    return response.text;
  } catch (error) {
    console.error("Erreur Tuteur :", error);
    return "Le nœud neural subit actuellement une latence élevée. Veuillez réessayer votre requête.";
  }
};

/**
 * Evaluate a user's module response using gemini-3-pro-preview.
 * This is a complex reasoning task that requires high precision.
 */
export const evaluateModule = async (
  moduleTitle: string,
  moduleContent: string,
  objectives: string[],
  userAnswer: string,
  customPrompt?: string,
  strictness: 'low' | 'medium' | 'high' = 'medium'
) => {
  try {
    const strictnessInstruction = strictness === 'high'
      ? "Sois EXTRÊMEMENT strict. Rejette toute imprécision."
      : strictness === 'low'
        ? "Sois indulgent. Valorise l'effort et la compréhension globale."
        : "Sois strict mais constructif. Un succès nécessite une précision technique.";

    const basePrompt = `Effectue un Audit de Compétence Technique pour un apprenant. 
                 
                 MODULE : ${moduleTitle}
                 CONTENU DU CURRICULUM : ${moduleContent}
                 OBJECTIFS CLÉS : ${objectives.join(', ')}
                 
                 RÉPONSE NARRATIVE DE L'APPRENANT : 
                 ---
                 ${userAnswer}
                 ---
                 
                 EXIGENCES DE L'AUDIT (EN FRANÇAIS) :
                 1. Évalue si l'apprenant a synthétisé le cœur technique du module.
                 2. Vérifie la compréhension du "pourquoi".
                 3. ${strictnessInstruction}
                 4. Ignore les fautes d'orthographe mineures.
                 5. FOURNIS LE FEEDBACK ET LES ÉTAPES SUIVANTES EN FRANÇAIS.`;

    const finalPrompt = customPrompt ? `${customPrompt}\n\n${basePrompt}` : basePrompt;

    const response = await ai.models.generateContent({
      // Use gemini-3-pro-preview for complex reasoning tasks like technical audit.
      model: 'gemini-3-pro-preview',
      contents: finalPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isPassed: {
              type: Type.BOOLEAN,
              description: "Vrai si l'apprenant répond aux standards techniques, faux sinon."
            },
            feedback: {
              type: Type.STRING,
              description: "Une analyse architecturale professionnelle de leur réponse. Soulignant les idées fausses ou louant la perspicacité."
            },
            score: {
              type: Type.NUMBER,
              description: "Score de compétence technique de 0 à 100."
            },
            nextSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Sujets techniques spécifiques recommandés à réviser s'ils ont échoué, ou sujets avancés s'ils ont réussi."
            }
          },
          required: ['isPassed', 'feedback', 'score', 'nextSteps'],
          propertyOrdering: ["isPassed", "feedback", "score", "nextSteps"]
        }
      }
    });
    // response.text returns the JSON string from the model.
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erreur d'Audit d'Évaluation :", error);
    return { isPassed: false, feedback: "Le nœud d'audit n'a pas répondu. L'état local est préservé.", score: 0, nextSteps: ["Réessayer la soumission de l'audit"] };
  }
};

/**
 * Generate full module content from an admin prompt.
 */
export const generateModuleContent = async (adminPrompt: string, moduleTitle: string) => {
  try {
    const prompt = `Génère le contenu pédagogique structuré pour un module de formation blockchain.
                 
                 TITRE DU MODULE : ${moduleTitle}
                 INTENTION DE L'ADMIN : ${adminPrompt}
                 
                 STRUCTURE REQUISE (EN FRANÇAIS) :
                 1. Theory: Un cours détaillé en Markdown (environ 500 mots).
                 2. Objectives: Une liste de 3-5 objectifs d'apprentissage.
                 3. Assessment: Un prompt pour l'audit final (ce que l'apprenant doit expliquer).
                 4. EvaluationCriteria: Instructions pour l'IA qui corrigera (quels détails techniques sont requis).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "Le cours complet au format Markdown." },
            objectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Liste d'objectifs." },
            assessmentPrompt: { type: Type.STRING, description: "L'énoncé de l'exercice final." },
            evaluationCriteria: { type: Type.STRING, description: "Critères de correction pour l'LLM." }
          },
          required: ['content', 'objectives', 'assessmentPrompt', 'evaluationCriteria']
        }
      }
    });

    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erreur de Génération de Contenu :", error);
    return null;
  }
};
