"use server";

import { FeedbackSchema } from "./schema";
import { systemPrompt } from "./utils";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

const ai_provider = createOpenAI({
  baseURL: process.env.LLM_BASE_URL || "http://localhost:8080/v1",
  apiKey: process.env.LLM_API_KEY || "",
});

const ai_model = ai_provider.chat(
  process.env.LLM_MODEL || "models/DeepSeek-R1-0528-Qwen3-8B-Q4_K_M.gguf",
);

export async function feedback(prompt: string) {
  console.log({ systemPrompt: systemPrompt, prompt });

  const result = await generateObject({
    model: ai_model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    schemaName: "feedback",
    schemaDescription: "resume feedback",
    schema: FeedbackSchema,
  });
  console.log({ result });

  return result.object;
}
