"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEnquiry } from "@/server/enquiry";
import { insertImageGallerySchema } from "@/db/schemas/home-content";
import {
  ImageGalleryType,
  InsertImageGalleryType,
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
import { UploadWidget } from "@/components/image-uploader";
import { useCreateImage, useUpdateImage } from "../api/use-image-gallery";
import { toast } from "sonner";

export default function ImageGalleryForm({
  onSuccess,
  initialData,
}: {
  onSuccess?: () => void;
  initialData: ImageGalleryType | null;
}) {
  const form = useForm<InsertImageGalleryType>({
    resolver: zodResolver(insertImageGallerySchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl ?? "",
      title: initialData?.title ?? "",
      subTitle: initialData?.subTitle ?? "",
    },
  });
  const createMutation = useCreateImage();
  const updateMutation = useUpdateImage();

  const onSubmit = (data: InsertImageGalleryType) => {
    if (initialData && initialData?.id) {
      updateMutation.mutate(
        { ...data, id: initialData.id, subTitle: data.subTitle || "" },
        {
          onSuccess: () => {
            onSuccess?.();
            toast.success("Image Content updated successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
      return;
    }
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
        toast.success("Image Content created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormField
          control={form.control}
          name="imageUrl"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <UploadWidget
                onUploadSuccess={(url) => {
                  form.setValue("imageUrl", url);
                }}
                value={field.value}
              />

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
