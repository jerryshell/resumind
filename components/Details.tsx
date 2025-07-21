import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import Image from "next/image";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={`flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px] ${score > 69 ? "bg-badge-green" : score > 39 ? "bg-badge-yellow" : "bg-badge-red"}`}
    >
      <Image
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
        width={100}
        height={100}
      />
      <p
        className={`text-sm font-medium ${score > 69 ? "text-badge-green-text" : score > 39 ? "text-badge-yellow-text" : "text-badge-red-text"}`}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl text-dark-200 font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type?: "good" | "improve"; tip?: string; explanation?: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <Image
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="size-5"
              width={100}
              height={100}
            />
            <p className="text-xl text-gray-500 ">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => {
          if (!tip.tip) {
            return null;
          }
          return (
            <div
              key={index + tip.tip}
              className={`flex flex-col gap-2 rounded-2xl p-4 ${tip.type === "good" ? "bg-green-50 border border-green-200 text-green-700" : "bg-yellow-50 border border-yellow-200 text-yellow-700"}`}
            >
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src={
                    tip.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt="score"
                  className="size-5"
                  width={100}
                  height={100}
                />
                <p className="text-xl font-semibold">{tip.tip}</p>
              </div>
              <p>{tip.explanation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        {feedback.toneAndStyle &&
          feedback.toneAndStyle.score &&
          feedback.toneAndStyle.tips && (
            <AccordionItem>
              <AccordionHeader itemId="tone-style">
                <CategoryHeader
                  title="语气"
                  categoryScore={feedback.toneAndStyle.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="tone-style">
                <CategoryContent tips={feedback.toneAndStyle.tips} />
              </AccordionContent>
            </AccordionItem>
          )}

        {feedback.content &&
          feedback.content.score &&
          feedback.content.tips && (
            <AccordionItem>
              <AccordionHeader itemId="content">
                <CategoryHeader
                  title="内容"
                  categoryScore={feedback.content.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="content">
                <CategoryContent tips={feedback.content.tips} />
              </AccordionContent>
            </AccordionItem>
          )}

        {feedback.structure &&
          feedback.structure.score &&
          feedback.structure.tips && (
            <AccordionItem>
              <AccordionHeader itemId="structure">
                <CategoryHeader
                  title="结构"
                  categoryScore={feedback.structure.score}
                />
              </AccordionHeader>
              <AccordionContent itemId="structure">
                <CategoryContent tips={feedback.structure.tips} />
              </AccordionContent>
            </AccordionItem>
          )}

        {feedback.skills && feedback.skills.score && feedback.skills.tips && (
          <AccordionItem>
            <AccordionHeader itemId="skills">
              <CategoryHeader
                title="技能"
                categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default Details;
