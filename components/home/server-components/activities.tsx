"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

import CategoryFormModal from "./category-modal";
import BlogFormModal from "./blog-form-modal";
import { BlogType } from "@/types/contents/home";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useGetActivities } from "../api/use-blogs";

const ActivitiesCms = () => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { data } = useGetActivities();
  const [initialData, setInitialData] = React.useState<null | BlogType>(null);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Activities</h1>
          <div className="flex items-center gap-2">
            <Button size={"sm"} onClick={() => setOpen(true)}>
              <Plus size={24} />
              Activity
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => setOpenCategory(true)}
            >
              <Plus size={24} />
              Category
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card key={d.id}>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d.title}</CardTitle>
                <CardDescription>{d.excerpt}</CardDescription>
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
      <CategoryFormModal open={openCategory} onOpenChange={setOpenCategory} />
      <BlogFormModal
        postType={"activity"}
        open={open}
        onOpenChange={setOpen}
        initialData={initialData}
      />
    </>
  );
};

export default ActivitiesCms;
