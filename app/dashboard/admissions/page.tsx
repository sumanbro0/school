"use client";
import AdmissionList from "@/components/home/server-components/registration/reg-list";
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
      <AdmissionList />
    </div>
  );
};

export default HomePage;
