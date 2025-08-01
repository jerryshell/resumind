"use server";

import { FeedbackJsonSchema } from "./schema";
import { systemPrompt } from "./utils";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.NEXT_LLM_BASE_URL || "http://localhost:8080/v1",
  apiKey: process.env.NEXT_LLM_API_KEY || "",
});

export async function feedback(prompt: string) {
  console.log({ systemPrompt, prompt });

  const completion = await client.chat.completions.parse({
    model:
      process.env.NEXT_LLM_MODEL ||
      "models/DeepSeek-R1-0528-Qwen3-8B-Q4_K_M.gguf",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    stream: false,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "feedback",
        description: "resume feedback",
        strict: true,
        schema: FeedbackJsonSchema,
      },
    },
  });
  console.log({ completion });

  const response = completion.choices[0].message.content;
  console.log({ response });

  return response;
}
