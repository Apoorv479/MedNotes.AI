const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

const generateDentalNotes = async (subject, topic, baseText, imageBuffer = null, mimeType = null) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log(` Using AI Model: gemini-2.5-flash`);

    // Prompt Engineering
    const prompt = `
      You are an experienced BDS  dental professor with 10 years of experience.
      Create exam-oriented notes for the following:
      Subject: ${subject}
      Topic/Context: ${topic || "See provided content"}
      
      Additional Context: ${baseText || "N/A"}

      Instructions:
      1. Notes must be concise and point-wise.
      2. GENERATE AT LEAST 10-15 VIVA QUESTIONS (covering definitions, clinical features, and treatment).
      3. Include mnemonics where possible.

      Output MUST be a valid JSON object with this exact structure (no markdown, no extra text):
      {
        "title": "Topic Name",
        "short_notes": ["point 1", "point 2"],
        "detailed_notes": {
          "definition": "...",
          "classification": ["...", "..."],
          "etiology": ["..."],
          "clinical_features": ["..."],
          "investigations": ["..."],
          "treatment": ["..."],
          "prognosis": ["..."]
        },
        "viva_questions": [
          { "q": "Question 1?", "a": "Answer 1" },
          { "q": "Question 2?", "a": "Answer 2" }
          // Ensure 10-15 questions here
        ],
        "mnemonics": ["Mnemonic 1: ..."],
        "tables": [
          {
            "title": "Table Title",
            "columns": ["Col1", "Col2"],
            "rows": [["Row1Data1", "Row1Data2"]]
          }
        ]
      }
    `;

    let result;
    
    if (imageBuffer) {
      const imagePart = fileToGenerativePart(imageBuffer, mimeType);
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    // Cleaning JSON
    const jsonString = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(jsonString);

  } catch (error) {
    console.error(" AI Service Error:", error);
    throw new Error("Failed to generate notes. AI Error.");
  }
};

module.exports = { generateDentalNotes };