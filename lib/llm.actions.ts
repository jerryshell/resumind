"use server";

import { feedbackJsonSchema } from "./utils";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.NEXT_LLM_BASE_URL || "http://localhost:1234/v1",
  apiKey: process.env.NEXT_LLM_API_KEY,
});

export async function feedback(prompt: string) {
  console.log({ prompt });

  const completion = await client.chat.completions.parse({
    model: process.env.NEXT_LLM_MODEL || "deepseek/deepseek-r1-0528-qwen3-8b",
    messages: [{ role: "user", content: prompt }],
    stream: false,
    response_format: {
      type: "json_schema",
      json_schema: feedbackJsonSchema,
    },
  });
  console.log({ completion });

  const response = completion.choices[0].message.content;
  console.log({ response });

  return response;
}
