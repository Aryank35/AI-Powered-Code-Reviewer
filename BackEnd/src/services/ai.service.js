const { GoogleGenerativeAI } = require("@google/generative-ai");
const { exec } = require("child_process");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
        AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

        You are an expert code reviewer with the ability to:
        - Analyze code structure, best practices, and efficiency.
        - Detect syntax, runtime, and logical errors.
        - Execute code and compare expected vs. actual output.
        - Suggest improvements and optimizations.
        
        **Review Guidelines:**
        1️⃣ If the code has errors, detect them and provide fixes.
        2️⃣ If the code runs correctly, analyze and provide optimization tips.
        3️⃣ Compare expected vs. actual output.
        4️⃣ Suggest best practices for maintainability and performance.

        **Review Format:**

        🔍 *Given Code:*  
        \`\`\`javascript
        function greet(name) {
            return "Hello, " + name;
        }
        console.log(greet("Alice"));
        \`\`\`

        ✅ *Expected Output:*  
        \`\`\`
        Hello, Alice
        \`\`\`

        🔴 *Issues (If Any):*  
        - If syntax/runtime errors exist, highlight them.
        
        💡 *Improvements:*  
        - Suggest improvements, even if the code is correct.
        
        Your role is to ensure high-quality, error-free, and optimized code.
    `
});

/**
 * Function to generate AI feedback and check code for errors.
 * @param {string} prompt - Code snippet provided by user
 * @returns {Promise<string>} - AI-generated review with execution results
 */
async function generateContent(prompt) {
    try {
        console.log("🔍 Running AI Review...");

        // Execute the provided code to check for syntax & runtime errors
        const executionResult = await executeCode(prompt);

        // Generate AI feedback based on the review
        const result = await model.generateContent({
            contents: [{ parts: [{ text: `${prompt}\n\nExecution Output:\n${executionResult}` }] }]
        });

        const response = result.response;
        if (!response || !response.candidates || response.candidates.length === 0) {
            throw new Error("Invalid response from AI API");
        }

        return response.candidates[0].content.parts[0].text + `\n\n🔍 **Execution Output:**\n${executionResult}`;
    } catch (error) {
        console.error("❌ AI API Error:", error);
        throw error;
    }
}

/**
 * Function to execute JavaScript code and return output or error.
 * @param {string} code - JavaScript code snippet
 * @returns {Promise<string>} - Execution output or error message
 */
async function executeCode(code) {
    return new Promise((resolve) => {
        exec(`node -e "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
            if (error) {
                resolve(`❌ Error: ${stderr || error.message}`);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

module.exports = { generateContent };
