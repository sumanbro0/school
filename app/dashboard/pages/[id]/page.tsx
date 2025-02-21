"use client";
import { useGetPage } from "@/components/home/api/use-pages";
import PagesForm from "@/components/home/server-components/pages-form";
import Loader from "@/components/loader";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const param: { id: string } = useParams();
  const { data, isLoading } = useGetPage(param.id);
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="px-8">
      {!isLoading && (
        <PagesForm
          initialData={data?.data || null}
          onSuccess={() => {
            router.back();
          }}
        />
      )}
    </div>
  );
};

export default Page;
