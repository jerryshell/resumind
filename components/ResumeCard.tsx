import ScoreCircle from "./ScoreCircle";
import Image from "next/image";
import Link from "next/link";

const ResumeCard = ({
  resume,
  deleteResume,
}: {
  resume: Resume;
  deleteResume: (id: string) => void;
}) => {
  return (
    <div className="flex w-[350px] flex-col gap-6 rounded-2xl bg-white p-4 lg:w-[430px] xl:w-[490px]">
      <Link href={`/resume/${resume.id}`}>
        <div className="flex flex-row items-center justify-between gap-2 max-md:items-center max-md:justify-center max-sm:flex-col">
          <h2 className="text-dark-200 text-3xl max-sm:text-xl font-bold break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg break-words text-gray-500">
            {resume.jobTitle}
          </h3>
          <div className="flex-shrink-0">
            {resume.feedback.overallScore && (
              <ScoreCircle score={resume.feedback.overallScore} />
            )}
          </div>
        </div>
        <div className="from-light-blue-100 to-light-blue-200 rounded-2xl bg-gradient-to-b p-4">
          <div className="w-full h-full">
            <Image
              src={resume.imagePath}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
              width={350}
              height={350}
            />
          </div>
        </div>
      </Link>
      <button
        className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] w-full cursor-pointer rounded-full px-4 py-2 text-white"
        onClick={() => deleteResume(resume.id)}
      >
        删除
      </button>
    </div>
  );
};

export default ResumeCard;
