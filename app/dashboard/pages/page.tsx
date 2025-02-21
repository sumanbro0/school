"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dot, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Loader from "@/components/loader";
import { useGetPages } from "@/components/home/api/use-pages";

const PagesPage = () => {
  const { data, isLoading, isRefetching } = useGetPages();

  if (isLoading || isRefetching || !data) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Extra Pages</h1>
          <div className="flex items-center gap-2">
            <Link passHref href={"/dashboard/pages/new"}>
              <Button size={"sm"}>
                <Plus size={24} />
                Add Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {(data?.data || [])?.map((d) => (
          <Card key={d?.id}>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d?.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {d?.parent} <Dot className="inline" /> {d.pageSlug}
                </p>
              </div>
              <Link passHref href={`pages/${d.id}`}>
                <Button variant={"ghost"} size={"icon"}>
                  <Edit size={18} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PagesPage;
