const ScoreBadge = ({ score }: { score: number }) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > 70) {
    badgeColor = "bg-badge-green text-green-600";
    badgeText = "优秀";
  } else if (score > 49) {
    badgeColor = "bg-badge-yellow text-yellow-600";
    badgeText = "良好";
  } else {
    badgeColor = "bg-badge-red text-red-600";
    badgeText = "不足";
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
