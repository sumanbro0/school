"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { PageType } from "@/types/contents/home";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PageFormModal from "./page-form-modal";
import { useGetPages } from "../api/use-pages";

const PagesCms = () => {
  const [open, setOpen] = React.useState(false);
  const { data } = useGetPages();
  const [initialData, setInitialData] = React.useState<null | PageType>(null);
  console.log(initialData);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Extra Pages</h1>
          <div className="flex items-center gap-2">
            <Button size={"sm"} onClick={() => setOpen(true)}>
              <Plus size={24} />
              Add Page
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card key={d?.id}>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d?.title}</CardTitle>
              </div>
              <Button
                onClick={() => {
                  setInitialData(d);
                  setOpen(true);
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <Edit size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <PageFormModal
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) setInitialData(null);
        }}
        initialData={initialData}
      />
    </>
  );
};

export default PagesCms;
