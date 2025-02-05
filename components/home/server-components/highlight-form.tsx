"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEnquiry } from "@/server/enquiry";
import { insertHighlightSchema } from "@/db/schemas/home-content";
import { HighlightType, InsertHighlightType } from "@/types/contents/home";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateHighlight, useUpdateHighlight } from "../api/use-highlights";
import { toast } from "sonner";

export default function HighlightForm({
  initialData,
  onSuccess,
}: {
  onSuccess?: () => void;
  initialData: HighlightType | null;
}) {
  const form = useForm<InsertHighlightType>({
    resolver: zodResolver(insertHighlightSchema),
    defaultValues: {
      backgroundImage: initialData?.backgroundImage ?? "",
      title: initialData?.title ?? "",
      subTitle: initialData?.subTitle ?? "",
      descreption: initialData?.descreption ?? "",
    },
  });
  const createMutation = useCreateHighlight();
  const updateMutation = useUpdateHighlight();

  const onSubmit = (data: InsertHighlightType) => {
    if (initialData) {
      updateMutation.mutate(
        { ...data, id: initialData.id, subTitle: data.subTitle || "" },
        {
          onSuccess: () => {
            toast.success("Highlight Content updated successfully");
            onSuccess?.();
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
        toast.success("Highlight Content created successfully");
        onSuccess?.();

        form.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="backgroundImage"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <UploadWidget
                value={field.value}
                onUploadSuccess={(url) => {
                  form.setValue("backgroundImage", url);
                }}
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
        <FormField
          control={form.control}
          name="descreption"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subtitile <span className="text-xs text-muted">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
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
