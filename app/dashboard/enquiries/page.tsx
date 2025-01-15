"use client";
import EnquiryList from "@/components/server/enquiry/enquiry-list";
import { useBreadcrumbStore } from "@/hooks/use-breadcrumb-store";
import React, { useEffect } from "react";

const HomePage = () => {
  const { setBreadcrumbs } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Enquiries",
        href: "#",
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div className="container mx-auto ">
      <EnquiryList />
    </div>
  );
};

export default HomePage;
