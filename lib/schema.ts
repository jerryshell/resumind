import * as z from "zod";

export const FeedbackSchema = z.object({
  overallScore: z.number().min(0).max(100).meta({ description: "总体评分" }),
  Ats: z.object({
    score: z.number().min(0).max(100).meta({ description: "基于 ATS 的评分" }),
    tips: z
      .array(
        z.object({
          type: z.enum(["good", "improve"]),
          tip: z.string(),
        }),
      )
      .min(3)
      .max(4)
      .meta({
        description: "提供建议",
      }),
  }),
  toneAndStyle: z.object({
    score: z
      .number()
      .min(0)
      .max(100)
      .meta({ description: "基于语气风格的评分" }),
    tips: z
      .array(
        z.object({
          type: z.enum(["good", "improve"]),
          tip: z.string().meta({ description: "为详细解释起一个简短的标题" }),
          explanation: z
            .string()
            .meta({ description: "详细解释并提供改进方法" }),
        }),
      )
      .min(3)
      .max(4)
      .meta({
        description: "提供建议",
      }),
  }),
  content: z.object({
    score: z.number().min(0).max(100).meta({ description: "基于内容的评分" }),
    tips: z
      .array(
        z.object({
          type: z.enum(["good", "improve"]),
          tip: z.string().meta({ description: "为详细解释起一个简短的标题" }),
          explanation: z
            .string()
            .meta({ description: "详细解释并提供改进方法" }),
        }),
      )
      .min(3)
      .max(4)
      .meta({
        description: "提供建议",
      }),
  }),
  structure: z.object({
    score: z.number().min(0).max(100).meta({ description: "基于结构的评分" }),
    tips: z
      .array(
        z.object({
          type: z.enum(["good", "improve"]),
          tip: z.string().meta({ description: "为详细解释起一个简短的标题" }),
          explanation: z
            .string()
            .meta({ description: "详细解释并提供改进方法" }),
        }),
      )
      .min(3)
      .max(4)
      .meta({
        description: "提供建议",
      }),
  }),
  skills: z.object({
    score: z.number().min(0).max(100).meta({ description: "基于技能的评分" }),
    tips: z
      .array(
        z.object({
          type: z.enum(["good", "improve"]),
          tip: z.string().meta({ description: "为详细解释起一个简短的标题" }),
          explanation: z
            .string()
            .meta({ description: "详细解释并提供改进方法" }),
        }),
      )
      .min(3)
      .max(4)
      .meta({
        description: "提供建议",
      }),
  }),
});

export const FeedbackJsonSchema = z.toJSONSchema(FeedbackSchema);

export type Feedback = z.infer<typeof FeedbackSchema>;
