import { AutoPopup } from "@/components/auto-popup";
import AdmissionFormModal from "@/components/home/admission-form-modal";
import Footer from "@/components/home/footer";
import { Navigation } from "@/components/home/navigation";
import React, { Suspense } from "react";

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
