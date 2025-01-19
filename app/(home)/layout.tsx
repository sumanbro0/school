import AdmissionFormModal from "@/components/home/admission-form-modal";
import { Navigation } from "@/components/home/navigation";
import React from "react";

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
      <AdmissionFormModal />
    </>
  );
};

export default IndexLayout;
