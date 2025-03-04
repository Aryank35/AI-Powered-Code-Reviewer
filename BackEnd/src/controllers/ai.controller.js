const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await aiService(prompt);
        res.json({ response });
    } catch (error) {
        console.error("AI Service Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
