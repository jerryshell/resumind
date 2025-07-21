import Image from "next/image";

interface Suggestion {
  type?: "good" | "improve";
  tip?: string;
}

interface AtsProps {
  score?: number;
  suggestions?: Suggestion[];
}

const Ats = (props: AtsProps) => {
  const score = props.score || 0;
  const suggestions = props.suggestions;

  // Determine background gradient based on score
  const gradientClass =
    score > 69
      ? "from-green-100"
      : score > 49
        ? "from-yellow-100"
        : "from-red-100";

  // Determine icon based on score
  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
        ? "/icons/ats-warning.svg"
        : "/icons/ats-bad.svg";

  // Determine subtitle based on score
  const subtitle =
    score > 69 ? "非常好！" : score > 49 ? "不错的开始" : "需要改进";

  return (
    <div
      className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}
    >
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={iconSrc}
          alt="ATS Score Icon"
          className="w-12 h-12"
          width={100}
          height={100}
        />
        <div>
          <h2 className="text-dark-200 max-sm:text-xl text-2xl font-bold ">
            ATS 分数 - {score}/100
          </h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-xl text-dark-200 font-semibold mb-2">{subtitle}</h3>
        <p className="text-gray-600 mb-4">
          这个分数代表了你的简历在雇主的 ATS 系统中的表现情况。
        </p>

        {/* Suggestions list */}
        <div className="space-y-3">
          {suggestions &&
            suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3">
                <Image
                  src={
                    suggestion.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5 mt-1"
                  width={100}
                  height={100}
                />
                <p
                  className={
                    suggestion.type === "good"
                      ? "text-green-700"
                      : "text-amber-700"
                  }
                >
                  {suggestion.tip}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-700 italic">
        不断优化你的简历，以提高通过 ATS 筛选并进入招聘人员手中的机会。
      </p>
    </div>
  );
};

export default Ats;
