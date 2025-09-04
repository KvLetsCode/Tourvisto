import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: "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",
});

async function main(prompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}


export default main;