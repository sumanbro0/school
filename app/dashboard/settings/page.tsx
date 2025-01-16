"use client";

import SchoolForm from "@/components/settings/school-form";
import { useBreadcrumbStore } from "@/hooks/use-breadcrumb-store";
import {
  useCreateSchool,
  useGetSchool,
  useUpdateSchool,
} from "@/server/school";
import { InsertSchool } from "@/types/school";
import React, { useEffect } from "react";
import { toast } from "sonner";

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
  const { data: school } = useGetSchool();
  console.log(school);
  const { mutate: createSchool, isPending: creating } = useCreateSchool();
  const { mutate: updateSchool, isPending: updating } = useUpdateSchool();

  const handleSubmit = async (data: InsertSchool, file?: File) => {
    console.log(file);
    if (school && school.scl) {
      updateSchool(
        { data, id: school.scl.id },
        {
          onSuccess: () => {
            toast.success("School updated successfully");
          },
          onError: () => {
            toast.error("An error occurred");
          },
        }
      );
    } else {
      createSchool(data, {
        onSuccess: () => {
          toast.success("School created successfully");
        },
        onError: () => {
          toast.error("An error occurred");
        },
      });
    }
  };

  return (
    <div className="container mx-auto ">
      <SchoolForm
        isLoading={creating || updating}
        school={
          school && {
            ...school?.scl,
            createdAt: new Date(school?.scl?.createdAt || ""),
            updatedAt: new Date(school?.scl?.updatedAt || ""),
          }
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SettingsPage;
