import { FeedbackJsonSchema, Resume } from "./schema";

export const formatSize = (bytes: number): string => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getResumesFromLocalStorage = () => {
  const resumesStr = localStorage.getItem("resumes") || "[]";
  try {
    const resumes: Resume[] = JSON.parse(resumesStr);
    return resumes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const setResumesToLocalStorage = (resumes: Resume[]) =>
  localStorage.setItem("resumes", JSON.stringify(resumes));

export const systemPrompt = `
你是一位精通 ATS(Applicant Tracking System) 的简历分析专家。
请分析并评估用户的简历，并提出改进建议。
如存在多处不足，请直接给予低分。
要求全面详尽，勇于指出错误和改进空间。
请结合职位描述进行针对性分析。
注意用户的简历内容已经被系统使用 PDF 文字提取工具进行了二次处理，可能会有一些奇怪的符号或者看起来像一大段文字，这是正常的，所以不用分析简历的视觉元素和文本格式。
请将结果以 JSON Object 形式返回。

<FeedbackJsonSchema>
${JSON.stringify(FeedbackJsonSchema)}
</FeedbackJsonSchema>
`;

export const buildPrompt = (
  jobTitle: string,
  jobDescription: string,
  resumeContent: string,
) => `
<jobTitle>
${jobTitle}
</jobTitle>

<jobDescription>
${jobDescription}
</jobDescription>

<resumeContent>
${resumeContent}
</resumeContent>
`;
