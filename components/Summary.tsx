import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";
import { Feedback } from "@/lib/schema";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between gap-2 rounded-2xl bg-gray-50 p-4">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl text-dark-200">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-dark-200 max-sm:text-xl text-2xl font-bold">
            你的简历评分
          </h2>
          <p className="text-sm text-gray-500">该评分基于以下变量计算得出</p>
        </div>
      </div>

      <Category title="语气" score={feedback.toneAndStyle.score} />
      <Category title="内容" score={feedback.content.score} />
      <Category title="结构" score={feedback.structure.score} />
      <Category title="技能" score={feedback.skills.score} />
    </div>
  );
};
export default Summary;
