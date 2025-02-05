"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import HighlightFormModal from "./highlight-form-modal";
import { Edit, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetHighlight } from "../api/use-highlights";

const Highlight = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useGetHighlight();
  const [initialData, setInitialData] = React.useState<{
    id: number;
    backgroundImage: string;
    title: string;
    subTitle: string | null;
    descreption: string;
  } | null>(null);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Highlights</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={24} />
            Add Highlight
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d.title}</CardTitle>
                <CardDescription>{d.subTitle}</CardDescription>
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
      <HighlightFormModal
        initialData={initialData}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default Highlight;
