import Fast from "@/components/Fast";
import MainArticle from "@/components/MainArticle";
import MedicalDashboard from "@/components/MedicalDashboard";
import WorkflowComponent from "@/components/WorkFlowComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <MainArticle />
      <Fast />
      <WorkflowComponent />
      <MedicalDashboard />
    </div>
  );
}
