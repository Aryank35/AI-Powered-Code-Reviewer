const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
    systemInstruction: `
    You are an code reviewer, who have an experties in development.
    You look for the code and find the problems and suggest the solution to the developer.
    `
 });

async function generateContent(prompt) {
    if (!prompt) throw new Error("Prompt is required");

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = generateContent;
