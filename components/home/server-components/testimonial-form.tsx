// components/TestimonialForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadWidget } from "@/components/image-uploader";
import {
  useCreateTestimonial,
  useUpdateTestimonial,
} from "../api/use-testimonial";
import { toast } from "sonner";
import {
  insertTestimonialSchema,
  InsertTestimonialType,
  TestimonialType,
} from "@/db/schemas/testimonials";

export default function TestimonialForm({
  onSuccess,
  initialData,
}: {
  onSuccess?: () => void;
  initialData: TestimonialType | null;
}) {
  const form = useForm<InsertTestimonialType>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      position: initialData?.position ?? "",
      company: initialData?.company ?? "",
      content: initialData?.content ?? "",
      avatarUrl: initialData?.avatarUrl ?? "",
    },
  });
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();

  const onSubmit = (data: InsertTestimonialType) => {
    if (initialData && initialData?.id) {
      updateMutation.mutate(
        {
          ...data,
          id: initialData.id,
          company: data.company || null,
          avatarUrl: data.avatarUrl || null,
        },
        {
          onSuccess: () => {
            onSuccess?.();
            toast.success("Testimonial updated successfully");
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
        toast.success("Testimonial created successfully");
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
          name="avatarUrl"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <UploadWidget
                onUploadSuccess={(url) => {
                  form.setValue("avatarUrl", url);
                }}
                value={field.value || "https://avatar.vercel.sh/jane"}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Testimonial</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter testimonial" {...field} />
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
