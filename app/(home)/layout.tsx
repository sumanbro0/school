import { Navigation } from "@/components/home/navigation";
import React from "react";

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default IndexLayout;
