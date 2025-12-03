require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

async function checkModels() {
  // Direct Google API URL
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    console.log("🔍 Fetching Google model list...");
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${JSON.stringify(data, null, 2)}`);
    }
    
    console.log("\n✅ API Key is valid.");
    console.log("📜 Available models:\n");
    
    let found = false;
    if (data.models) {
        data.models.forEach(model => {
        if(model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
            console.log(`👉 ${model.name}`);
            found = true;
        }
        });
    }

    if(!found) {
      console.log("⚠️ Models list returned, but no 'generateContent' model was found.");
    }
    
  } catch (error) {
    console.error("\n❌ API Key error:");
    console.error(error.message);
  }
}

checkModels();