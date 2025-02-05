"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import VideoFormModal from "./video-form-modal";
import { useGetVideos } from "../api/use-video-gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { VideoGalleryType } from "@/types/contents/home";

const VideoGallery = () => {
  const [open, setOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState<VideoGalleryType | null>(
    null
  );
  const { data } = useGetVideos();
  console.log(data);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Videos</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={24} />
            Add Video
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
      <VideoFormModal
        initialData={initialData}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default VideoGallery;
