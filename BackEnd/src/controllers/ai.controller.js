const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService.generateContent(code);
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: "AI service failed", details: error.message });
    }
};
