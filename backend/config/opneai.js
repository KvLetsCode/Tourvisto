import OpenAI from "openai";

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