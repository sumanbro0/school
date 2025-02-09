"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, InsertCategoryType } from "@/types/contents/home";
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
import { toast } from "sonner";
import { insertCategorySchema } from "@/db/schemas/blogs";
import { useCreateCategories } from "../api/use-blogs";

export default function CategoryForm({
  initialData,
  onSuccess,
}: {
  onSuccess?: () => void;
  initialData?: CategoryType | null;
}) {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });
  const createMutation = useCreateCategories();

  const onSubmit = (data: InsertCategoryType) => {
    if (initialData) {
      return;
    }
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
