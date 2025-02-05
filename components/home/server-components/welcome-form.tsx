"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWelcomeSchema } from "@/db/schemas/home-content";
import { InsertWelcomeType } from "@/types/contents/home";
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
import {
  useCreatewelcome,
  useGetwelcome,
  useUpdatewelcome,
} from "../api/use-welcome";
import { toast } from "sonner";

export default function WelcomeForm({}: { onSuccess?: () => void }) {
  const { isLoading, data: formData } = useGetwelcome();
  const form = useForm<InsertWelcomeType>({
    resolver: zodResolver(insertWelcomeSchema),
    defaultValues: {
      backgroundImage: formData?.data?.backgroundImage ?? "",
      title: formData?.data?.title ?? "",
      subTitle: formData?.data?.subTitle ?? "",
      descreption: formData?.data?.descreption ?? "",
    },
  });

  useEffect(() => {
    if (!formData?.data || isLoading) return;
    form.reset(formData?.data);
  }, [form, formData, isLoading]);

  const createMutation = useCreatewelcome();
  const updateMutation = useUpdatewelcome();

  const onSubmit = (data: InsertWelcomeType) => {
    if (formData && formData?.data?.id) {
      updateMutation.mutate(
        { ...data, id: formData.data.id, subTitle: data.subTitle || "" },
        {
          onSuccess: () => {
            toast.success("Welcome Content updated successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Welcome Content created successfully");
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto pt-4"
      >
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
                <Input
                  disabled={isLoading}
                  placeholder="Enter title"
                  {...field}
                />
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
