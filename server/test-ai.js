// server/test-ai.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB2l0zi37ugCHeXLitFkJkH2f1loFF"

async function testGemini() {
  console.log("1. Connecting to Gemini...");
  const genAI = new GoogleGenerativeAI(API_KEY);
  
 const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    console.log("2. Sending request...");
    const result = await model.generateContent("Say Hello to a dental student");
    const response = await result.response;
    const text = response.text();
    console.log(" SUCCESS! AI Responded:");
    console.log(text);
  } catch (error) {
    console.error(" FAILED. Error details:");
    console.error(error.message);
  }
}

testGemini();