"use client";

import FileUploader from "@/components/FileUploader";
import { feedback } from "@/lib/llm.actions";
import { convertPdfToImage, convertPdfToText } from "@/lib/pdfUtils";
import {
  buildPrompt,
  getResumesFromLocalStorage,
  setResumesToLocalStorage,
} from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const UploadPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) {
      return;
    }

    resumeAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const resumeAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("转换图像...");
    const pdfToImageResult = await convertPdfToImage(file);
    if (!pdfToImageResult.file) {
      setStatusText("错误：Failed to convert PDF to image");
      return;
    }

    setStatusText("提取文字...");
    const pdfText = await convertPdfToText(file).catch((e) => {
      console.error(e);
    });
    if (!pdfText) {
      setStatusText("错误：Failed to convert PDF to text");
      return;
    }

    const prompt = buildPrompt(jobTitle, jobDescription, pdfText);

    setStatusText("分析中，请耐心等待...");
    const feedbackText = await feedback(prompt).catch((e) => {
      console.error(e);
    });
    if (!feedbackText) {
      setStatusText("错误：Failed to analyze resume");
      return;
    }

    setStatusText("保存数据...");
    const resume: Resume = {
      id: crypto.randomUUID(),
      imagePath: pdfToImageResult.imageDataUrl,
      companyName,
      jobTitle,
      jobDescription,
      feedback: JSON.parse(feedbackText),
    };

    const resumes = getResumesFromLocalStorage();
    resumes.push(resume);
    setResumesToLocalStorage(resumes);

    setStatusText("分析完成，正在渲染结果...");
    router.push(`/resume/${resume.id}`);
  };

  return (
    <section className="mx-15 flex flex-col items-center gap-8 pt-12 pb-5 max-sm:mx-2">
      <div className="flex max-w-4xl flex-col items-center gap-8 text-center max-sm:gap-4 py-16">
        <h1 className="bg-gradient-to-r from-[#AB8C95] to-[#8E97C5] bg-clip-text text-6xl leading-tight font-semibold text-transparent max-sm:text-[3rem] xl:tracking-[-2px]">
          智能简历反馈，助力职业生涯
        </h1>
        {isProcessing ? (
          <>
            <h2 className="text-dark-200 text-3xl max-sm:text-xl">
              {statusText}
            </h2>
            <Image
              src="/images/resume-scan.gif"
              className="w-full"
              alt="loading"
              width={100}
              height={100}
            />
          </>
        ) : (
          <h2 className="text-dark-200 text-3xl max-sm:text-xl">
            即将获得 ATS 评分，立刻解锁改造秘籍！
          </h2>
        )}
        {!isProcessing && (
          <form
            id="upload-form"
            onSubmit={handleSubmit}
            className="w-full items-start flex flex-col gap-4 mt-8"
          >
            <div className="flex w-full flex-col items-start gap-2">
              <label className="text-dark-200" htmlFor="company-name">
                公司名称
              </label>
              <input
                className="w-full rounded-2xl bg-white p-4 shadow-[inset_0_0_12px_0_rgba(36,99,235,0.2)]  focus:outline-none"
                type="text"
                name="company-name"
                placeholder="Goole / Apple / Microsoft"
                id="company-name"
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label className="text-dark-200" htmlFor="job-title">
                职位名称
              </label>
              <input
                className="w-full rounded-2xl bg-white p-4 shadow-[inset_0_0_12px_0_rgba(36,99,235,0.2)]  focus:outline-none"
                type="text"
                name="job-title"
                placeholder="前端工程师 / 后端工程师 / 全栈工程师 / DevOps"
                id="job-title"
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label className="text-dark-200" htmlFor="job-description">
                职位描述
              </label>
              <textarea
                rows={5}
                name="job-description"
                placeholder="Job Description"
                id="job-description"
                className="shadow-[inset_0_0_12px_0_rgba(36,99,235,0.2)] w-full rounded-2xl bg-white p-4 focus:outline-none"
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label className="text-dark-200" htmlFor="uploader">
                上传简历
              </label>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
            <button
              className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] w-full cursor-pointer rounded-full px-4 py-2 text-white"
              type="submit"
            >
              分析简历
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UploadPage;
