import * as z from "zod";

const FeedbackItemSchema = z.object({
  score: z.number().min(0).max(100),
  tips: z
    .array(
      z.object({
        type: z.enum(["good", "improve"]),
        tip: z.string().meta({ description: "为详细解释起一个简短的标题" }),
        explanation: z.string().meta({ description: "详细解释并提供改进方法" }),
      }),
    )
    .min(3)
    .max(4)
    .meta({
      description: "提供建议",
    }),
});

export const FeedbackSchema = z.object({
  overallScore: z.number().min(0).max(100).meta({ description: "总体评分" }),
  Ats: FeedbackItemSchema.meta({ description: "基于 ATS 的反馈" }),
  toneAndStyle: FeedbackItemSchema.meta({ description: "基于语气风格的反馈" }),
  content: FeedbackItemSchema.meta({ description: "基于内容的反馈" }),
  structure: FeedbackItemSchema.meta({ description: "基于结构的反馈" }),
  skills: FeedbackItemSchema.meta({ description: "基于技能的反馈" }),
});

export const FeedbackJsonSchema = z.toJSONSchema(FeedbackSchema);

export type Feedback = z.infer<typeof FeedbackSchema>;

export type Resume = {
  id: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  imagePath: string;
  feedback: Feedback;
};
