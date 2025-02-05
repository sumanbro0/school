"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertVideoGallerySchema } from "@/db/schemas/home-content";
import {
  InsertVideoGalleryType,
  VideoGalleryType,
} from "@/types/contents/home";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useCreateVideo, useUpdateVideo } from "../api/use-video-gallery";
import { toast } from "sonner";

export default function VideoGalleryForm({
  onSuccess,
  initialData,
}: {
  onSuccess?: () => void;
  initialData: VideoGalleryType | null;
}) {
  const form = useForm<InsertVideoGalleryType>({
    resolver: zodResolver(insertVideoGallerySchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl ?? "",
      title: initialData?.title ?? "",
      subTitle: initialData?.subTitle ?? "",
    },
  });
  const createMutation = useCreateVideo();
  const updateMutation = useUpdateVideo();

  const onSubmit = (data: InsertVideoGalleryType) => {
    if (initialData && initialData.id) {
      updateMutation.mutate(
        { ...data, id: initialData.id, subTitle: data.subTitle || "" },
        {
          onSuccess: () => {
            onSuccess?.();
            toast.success("Video Content updated successfully");
          },
          onError: (error) => {
            console.log(error.message);
          },
        }
      );
      return;
    }
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
        toast.success("Video Content created successfully");
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormField
          control={form.control}
          name="videoUrl"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <Input placeholder="Enter Video Url" {...field} />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subTitle"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subtitile <span className="text-xs text-muted">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter subtitle"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Submitting..."
              : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
