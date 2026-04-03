const conf = require("../../conf/conf.json")
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: conf.openaikey,
});

const openai = async (param) => {
  const response = await client.responses.create({
    model: "gpt-5",
    input: `Explain the meaning of name: ${param}`
  });

  console.log(response.output_text);
}

exports.openai = openai;