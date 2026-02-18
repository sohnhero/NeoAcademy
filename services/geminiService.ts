
import { GoogleGenAI, Type } from "@google/genai";

// Lazy-load the AI client to prevent crashing if the API key is missing in production environments.
let aiInstance: any = null;
const getAI = () => {
  if (aiInstance) return aiInstance;

  // Check both process.env (Vite define) and import.meta.env
  const apiKey = (process.env.GEMINI_API_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'undefined') {
    console.error("CRITICAL: GEMINI_API_KEY is not defined. Neural Node functions will be disabled.");
    return null;
  }

  aiInstance = new GoogleGenAI({ apiKey: apiKey });
  return aiInstance;
};

/**
 * Ask the AI tutor a question based on the provided context.
 * Uses gemini-3-flash-preview for general technical support.
 */
export const askTutor = async (question: string, context?: string, customContext?: string) => {
  try {
    const systemInstruction = customContext
      ? `INSTRUCTION SYSTÈME CUSTOM : ${customContext}\n\nContexte Standard : ${context}`
      : `Tu es le "Tuteur Neural" de NeoAcademy AI, un LMS Web3 d'élite basé sur une architecture de neurones artificiels. 
                 Ton ton est sophistiqué, hautement technique mais pédagogue, inspirant la confiance et l'excellence.
                 Tu ne te contentes pas de répondre factuellement ; tu contextualises chaque concept dans l'écosystème Web3 actuel (DeFi, ZK-Proofs, MEV, Gouvernance).
                 
                 CONTEXTE D'IMMERSION (Module Actuel) : ${context || 'Ingénierie Blockchain Globale'}`;

    const ai = getAI();
    if (!ai) throw new Error("AI client not initialized");

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${systemInstruction}
                 REQUÊTE DE L'APPRENANT : ${question}
                 
                 DIRECTIVES CRITIQUES :
                 1. Utilise une terminologie technique de pointe en FRANÇAIS (ex: "calldata", "storage slot collision", "shadowing de variables").
                 2. Architecture tes réponses avec des sections claires (Théorie, Exemple Pratique, Sécurité).
                 3. Propose des extraits de code optimisés (Yul/Inline Assembly si pertinent pour l'optimisation de gas).
                 4. Si la question est trop évasive, utilise la méthode socratique pour guider l'apprenant.
                 5. RÉPONDS EXCLUSIVEMENT EN FRANÇAIS AVEC UNE PRÉCISION CHIRURGICALE.`,
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
                 
                 EXIGENCES DE L'AUDIT (CRITÈRES D'ÉLITE) :
                 1. Rigueur Technique : L'apprenant a-t-il saisi les nuances architecturales (ex: gestion de la mémoire, risques de réentrance, optimisation des calculs) ?
                 2. Synthèse : La réponse démontre-t-elle une capacité à relier la théorie à l'impact sur le réseau principal (Mainnet) ?
                 3. ${strictnessInstruction}
                 4. Neutralité : Ignore les erreurs de forme, concentre-toi sur la substance logique.
                 5. FEEDBACK UNIVERSEL : Rédige un audit constructif, technique et motivant en FRANÇAIS.`;

    const finalPrompt = customPrompt ? `${customPrompt}\n\n${basePrompt}` : basePrompt;

    const ai = getAI();
    if (!ai) throw new Error("AI client not initialized");

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

    const ai = getAI();
    if (!ai) throw new Error("AI client not initialized");

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

/**
 * Generate a diagnostic test based on the learner's chosen path context.
 * Returns 5 MCQ questions and 1 open-ended question.
 */
export const generateDiagnosticTest = async (context: string, flowType: 'ai' | 'modular' | 'certified') => {
  try {
    const flowContext = flowType === 'ai'
      ? `L'apprenant a décrit son objectif de carrière comme suit : "${context}". Génère un test diagnostic pour évaluer son niveau actuel dans les domaines pertinents à cet objectif.`
      : flowType === 'modular'
        ? `L'apprenant a sélectionné les modules suivants : ${context}. Génère un test diagnostic pour évaluer son niveau dans ces domaines spécifiques.`
        : `L'apprenant a choisi le parcours certifiant : "${context}". Génère un test diagnostic pour évaluer son niveau dans les compétences requises par ce parcours.`;

    const prompt = `Tu es un expert en pédagogie Web3 et blockchain. ${flowContext}

OBJECTIF : Générer un test diagnostic de 6 questions pour évaluer précisément le niveau de l'apprenant.

CONTRAINTES :
- 5 questions à choix multiples (QCM) avec exactement 4 options chacune
- 1 question ouverte qui teste la compréhension profonde
- Les questions doivent couvrir différents niveaux de difficulté (débutant, intermédiaire, avancé)
- Chaque question doit être liée à un sujet/topic précis
- Les questions doivent être en FRANÇAIS
- Les options des QCM doivent être plausibles (pas de réponses évidentes)`;

    const ai = getAI();
    if (!ai) throw new Error("AI client not initialized");

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "ID unique de la question (ex: q1, q2...)" },
                  type: { type: Type.STRING, description: "Type : 'mcq' ou 'open'" },
                  question: { type: Type.STRING, description: "L'énoncé de la question" },
                  options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Les 4 options pour les QCM" },
                  correctAnswer: { type: Type.STRING, description: "La bonne réponse pour les QCM" },
                  topic: { type: Type.STRING, description: "Le sujet/domaine testé" }
                },
                required: ['id', 'type', 'question', 'topic']
              },
              description: "Les 6 questions du test diagnostic"
            }
          },
          required: ['questions']
        },
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    const jsonStr = response.text?.trim() || '{"questions":[]}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erreur Diagnostic Test Generation:", error);
    // Fallback: return hardcoded questions so the flow doesn't break
    return {
      questions: [
        { id: 'q1', type: 'mcq', question: 'Qu\'est-ce qu\'un smart contract ?', options: ['Un contrat juridique numérique', 'Un programme auto-exécutant sur la blockchain', 'Un protocole de consensus', 'Une clé privée'], correctAnswer: 'Un programme auto-exécutant sur la blockchain', topic: 'Fondamentaux Blockchain' },
        { id: 'q2', type: 'mcq', question: 'Quel est le rôle du gas dans Ethereum ?', options: ['Stocker des données', 'Payer les frais de transaction', 'Valider les blocs', 'Créer des tokens'], correctAnswer: 'Payer les frais de transaction', topic: 'Ethereum' },
        { id: 'q3', type: 'mcq', question: 'Que signifie DeFi ?', options: ['Definite Finance', 'Decentralized Finance', 'Digital Finance', 'Distributed Finance'], correctAnswer: 'Decentralized Finance', topic: 'DeFi' },
        { id: 'q4', type: 'mcq', question: 'Quelle vulnérabilité permet à un attaquant de rappeler un contrat avant la fin de l\'exécution ?', options: ['Overflow', 'Reentrancy', 'Front-running', 'Phishing'], correctAnswer: 'Reentrancy', topic: 'Sécurité' },
        { id: 'q5', type: 'mcq', question: 'Quel standard définit les tokens non-fongibles (NFTs) ?', options: ['ERC-20', 'ERC-721', 'ERC-1155', 'ERC-777'], correctAnswer: 'ERC-721', topic: 'Standards' },
        { id: 'q6', type: 'open', question: 'Expliquez en quelques phrases comment fonctionne un mécanisme de consensus Proof-of-Stake et quels avantages il offre par rapport au Proof-of-Work.', topic: 'Consensus' }
      ]
    };
  }
};

/**
 * Evaluate diagnostic test answers and determine the learner's level, gaps, and strengths.
 */
export const evaluateDiagnostic = async (
  questions: any[],
  answers: Record<string, string>,
  pathContext: string
) => {
  try {
    const formattedQA = questions.map((q, i) => {
      const answer = answers[q.id] || '(pas de réponse)';
      return `Q${i + 1} [${q.topic}] (${q.type}): ${q.question}\nRéponse de l'apprenant: ${answer}${q.type === 'mcq' ? `\nBonne réponse: ${q.correctAnswer}` : ''}`;
    }).join('\n\n');

    const prompt = `Tu es un expert pédagogue Web3. Évalue les réponses d'un apprenant à un test diagnostic.

CONTEXTE DU PARCOURS : ${pathContext}

QUESTIONS ET RÉPONSES :
${formattedQA}

INSTRUCTIONS :
1. Évalue chaque réponse avec précision
2. Détermine le niveau global de l'apprenant
3. Identifie ses lacunes et ses points forts
4. Propose des recommandations concrètes pour adapter son parcours
5. Tout doit être en FRANÇAIS`;

    const ai = getAI();
    if (!ai) throw new Error("AI client not initialized");

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, description: "Niveau global: 'débutant', 'intermédiaire', ou 'avancé'" },
            score: { type: Type.NUMBER, description: "Score sur 100" },
            gaps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Liste des lacunes identifiées" },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Liste des points forts" },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Recommandations d'adaptation du parcours" },
            adaptedModuleNotes: { type: Type.STRING, description: "Notes détaillées pour l'adaptation des modules du parcours" }
          },
          required: ['level', 'score', 'gaps', 'strengths', 'recommendations', 'adaptedModuleNotes']
        },
        temperature: 0.3,
        maxOutputTokens: 1500,
      }
    });

    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erreur Diagnostic Evaluation:", error);
    return {
      level: 'intermédiaire',
      score: 50,
      gaps: ['Évaluation indisponible — le nœud neural est en maintenance.'],
      strengths: ['Motivation à apprendre détectée.'],
      recommendations: ['Suivre le parcours standard avec un suivi renforcé.'],
      adaptedModuleNotes: 'Parcours standard recommandé. Le test diagnostic n\'a pas pu être analysé.'
    };
  }
};

