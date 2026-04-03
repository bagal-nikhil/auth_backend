const OpenAI = require("openai");
const conf = require("../../conf/conf.json")
const sendEmail = require("../../communication/emailHelper/emailHelper.js")

const client = new OpenAI({
    apiKey: conf.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1", // 🔥 IMPORTANT
});

const groqChat = async (email, name) => {
    const response = await client.responses.create({
        model: "llama-3.3-70b-versatile",
        input: `
Explain the name "${name}" in a meaningful and descriptive way.

Include:
- Meaning of the name
- Cultural or spiritual significance (if any)
- Personality traits associated with the name
- Keep it around 10 lines
- Do NOT ask questions
- Do NOT mention any company or platform
- Write in a warm and descriptive tone
`
    });
    console.log(`Response is ${JSON.stringify(response.output_text)}`)
    const aiMessage =
        response.output_text ||
        response.output?.[0]?.content?.[0]?.text ||
        "Welcome to our platform!";

    const sendcomms = await sendEmail(
        email,
        "Personalized Welcome Message 🎉",
        "personalizedNameDetails",
        {
            name: name,
            aiMessage: aiMessage
        }
    );
};

module.exports = { groqChat };