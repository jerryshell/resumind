"use client";

import ResumeCard from "./ResumeCard";
import { Resume } from "@/lib/schema";
import {
  getResumesFromLocalStorage,
  setResumesToLocalStorage,
} from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResumeList = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    setResumes(getResumesFromLocalStorage());
  }, []);

  const deleteResume = (id: string) => {
    setResumes((prev) => {
      const newResume = prev.filter((item) => item.id != id);
      setResumesToLocalStorage(newResume);
      return newResume;
    });
  };

  return (
    <section className="mx-15 flex flex-col items-center gap-8 pt-12 pb-5 max-sm:mx-2">
      <div className="flex max-w-4xl flex-col items-center gap-8 text-center max-sm:gap-4 py-16">
        <h1 className="bg-gradient-to-r from-[#AB8C95] to-[#8E97C5] bg-clip-text text-6xl leading-tight font-semibold text-transparent max-sm:text-[3rem] xl:tracking-[-2px]">
          求职精准定位与简历评分
        </h1>
        {resumes?.length === 0 ? (
          <h2 className="text-dark-200 text-3xl max-sm:text-xl">
            暂无分析记录，上传简历获取首份智能报告
          </h2>
        ) : (
          <h2 className="text-dark-200 text-3xl max-sm:text-xl">
            上传 PDF 简历 → 查看 AI 优化建议
          </h2>
        )}
      </div>

      {resumes.length > 0 && (
        <div className="flex w-full flex-wrap items-start justify-evenly gap-6 max-md:flex-col max-md:items-center max-md:gap-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              deleteResume={deleteResume}
            />
          ))}
        </div>
      )}

      {resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link
            href="/upload"
            className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] cursor-pointer rounded-full px-4 py-2 text-white w-fit text-xl font-semibold"
          >
            上传简历
          </Link>
        </div>
      )}
    </section>
  );
};

export default ResumeList;
