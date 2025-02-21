"use client";
import PagesForm from "@/components/home/server-components/pages-form";
import { useRouter } from "next/navigation";
import React from "react";

const NewPage = () => {
  const router = useRouter();

  return (
    <div className="px-8">
      <PagesForm initialData={null} onSuccess={() => router.back()} />
    </div>
  );
};

export default NewPage;
