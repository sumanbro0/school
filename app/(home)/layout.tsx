import { AutoPopup } from "@/components/auto-popup";
import AdmissionFormModal from "@/components/home/admission-form-modal";
import Footer from "@/components/home/footer";
import { Navigation } from "@/components/home/navigation";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "MDN Public School",
  description:
    "MDN Public School, regarded as one of the top 10 best schools in Rohtak, Haryana, is affiliated to the Central Board of Secondary Education (CBSE) and provides education from classes primary to senior-secondary. We are known as one of the best schools in Haryana for our quality education and our ability to harness, inculcate and foster an all-round growth in our students. The curriculum followed is as prescribed by the CBSE. The medium of instruction is English and the educational material used is approved by NCERT. Being one of the top CBSE schools in Rohtak, we follow a stringent evaluation process. The evaluation is done following the Continuous and Comprehensive Evaluation (CCE) system as per CBSE Guidelines. The school is equipped with vast, lush green fields, and well-maintained sports equipment, aiding in the overall development of each student.",
};

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense>
        <Navigation />
        <main className="pt-24">
          <Suspense>{children}</Suspense>
        </main>
        <AdmissionFormModal />
        <AutoPopup />
        <Footer />
      </Suspense>
    </>
  );
};

export default IndexLayout;
