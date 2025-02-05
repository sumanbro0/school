"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import ImageFormModal from "./image-form-modal";
import { ImageGalleryType } from "@/types/contents/home";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useGetImages } from "../api/use-image-gallery";

const ImageGallery = () => {
  const [open, setOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState<ImageGalleryType | null>(
    null
  );
  const { data } = useGetImages();
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Images</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={24} />
            Add Images
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card key={d.id}>
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
      <ImageFormModal
        initialData={initialData}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default ImageGallery;
