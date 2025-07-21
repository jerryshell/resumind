import ResumeReview from "@/components/ResumeReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumind | 详情",
  description: "简历分析详情",
};

const ResumePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ResumeReview id={id} />;
};
export default ResumePage;
