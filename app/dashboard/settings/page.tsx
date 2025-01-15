"use client";

import { useBreadcrumbStore } from "@/hooks/use-breadcrumb-store";
import React, { useEffect } from "react";

const SettingsPage = () => {
  const { setBreadcrumbs } = useBreadcrumbStore();
  useEffect(() => {
    setBreadcrumbs([
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Settings",
        href: "#",
      },
    ]);
  }, [setBreadcrumbs]);

  return <div className="container mx-auto ">Settings Page</div>;
};

export default SettingsPage;
