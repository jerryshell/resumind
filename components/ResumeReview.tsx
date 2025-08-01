"use client";

import Ats from "./Ats";
import Details from "./Details";
import Summary from "./Summary";
import { Resume } from "@/lib/schema";
import { getResumesFromLocalStorage } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResumeReview = ({ id }: { id: string }) => {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>();

  useEffect(() => {
    const resumes = getResumesFromLocalStorage();
    const resume = resumes.find((item) => item.id === id);
    console.log({ resume });
    if (!resume) {
      router.push("/");
      return;
    }
    setResume(resume);
  }, [id, router]);

  return (
    <main className="min-h-screen pt-0">
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="flex w-1/2 flex-col gap-8 px-8 py-6 max-lg:w-full h-[100vh] sticky top-0 items-center justify-center">
          <div className="from-light-blue-100 to-light-blue-200 rounded-2xl bg-gradient-to-b p-4 max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
            {resume && (
              <a
                href={resume.imagePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={resume.imagePath}
                  className="w-full h-full object-contain rounded-2xl"
                  alt="resume"
                  width={100}
                  height={100}
                />
              </a>
            )}
          </div>
        </section>

        <section className="flex w-1/2 flex-col gap-8 px-8 py-6 max-lg:w-full">
          <h2 className="text-dark-200 max-sm:text-xl text-4xl font-bold">
            简历分析详情
          </h2>
          {resume ? (
            <div className="flex flex-col gap-8">
              <Summary feedback={resume.feedback} />
              {resume.feedback.Ats &&
                resume.feedback.Ats.score &&
                resume.feedback.Ats.tips && (
                  <Ats
                    score={resume.feedback.Ats.score}
                    suggestions={resume.feedback.Ats.tips}
                  />
                )}
              <Details feedback={resume.feedback} />
            </div>
          ) : (
            <Image
              src="/images/resume-scan-2.gif"
              className="w-full"
              alt="loading"
              width={100}
              height={100}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default ResumeReview;
