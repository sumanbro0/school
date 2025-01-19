import AdmissionFormModal from "@/components/home/admission-form-modal";
import Footer from "@/components/home/footer";
import { Navigation } from "@/components/home/navigation";
import React from "react";

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className="pt-24">

      {children}
      </main>
      <AdmissionFormModal />
      <Footer/>
    </>
  );
};

export default IndexLayout;
