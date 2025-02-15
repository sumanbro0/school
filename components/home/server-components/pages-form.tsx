"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertPageType, PageType } from "@/types/contents/home";
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

import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertPageSchema, parentEnums } from "@/db/schemas/pages";
import { useCreatePages, useUpdatePages } from "../api/use-pages";

export default function PagesForm({
  initialData,
  onSuccess,
}: {
  onSuccess?: () => void;
  initialData: PageType | null;
}) {
  const form = useForm<InsertPageType>({
    resolver: zodResolver(insertPageSchema),
    defaultValues: {
      banner: initialData?.banner ?? "",
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
      pageSlug: initialData?.pageSlug ?? "",
      parent: initialData?.parent ?? "about",
    },
  });
  const createMutation = useCreatePages();
  const updateMutation = useUpdatePages();

  const onSubmit = (data: InsertPageType) => {
    if (initialData) {
      updateMutation.mutate(
        {
          ...data,
          id: initialData.id || 0,
        },
        {
          onSuccess: () => {
            toast.success("Page Content updated successfully");
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
        toast.success("Page Content created successfully");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormField
          control={form.control}
          name="banner"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <UploadWidget
                value={field.value || "https://avatar.vercel.sh/jane"}
                onUploadSuccess={(url) => {
                  form.setValue("banner", url);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pageSlug"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Page Slug"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent link" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parentEnums?.map((p, i) => (
                    <SelectItem className="capitalize" key={i} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={20}
                  placeholder="Enter Your page content in markdown eg. # Hello World"
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
