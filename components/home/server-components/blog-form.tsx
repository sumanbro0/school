"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogType, InsertBlogType } from "@/types/contents/home";
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
  useCreateBlogs,
  useGetCategories,
  useUpdateBlogs,
} from "../api/use-blogs";
import { toast } from "sonner";
import { insertBlogSchema } from "@/db/schemas/blogs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BlogsForm({
  initialData,
  onSuccess,
  postType,
}: {
  onSuccess?: () => void;
  postType: BlogType["contentTypeEnum"];
  initialData: BlogType | null;
}) {
  const form = useForm<InsertBlogType>({
    resolver: zodResolver(insertBlogSchema),
    defaultValues: {
      image: initialData?.image ?? "",
      title: initialData?.title ?? "",
      excerpt: initialData?.excerpt ?? "",
      description: initialData?.description ?? "",
      category: initialData?.category ?? "",
      tags: initialData?.tags ?? "",
      contentTypeEnum: postType,
    },
  });
  const createMutation = useCreateBlogs();
  const updateMutation = useUpdateBlogs();
  const { data: categories } = useGetCategories();

  const onSubmit = (data: InsertBlogType) => {
    if (initialData) {
      updateMutation.mutate(
        {
          ...data,
          id: initialData.id,
          excerpt: data.excerpt || "",
          category: data.category || "",
          tags: data.tags || "",
          contentTypeEnum: postType,
          image: data.image || "https://avatar.vercel.sh/jane",
        },
        {
          onSuccess: () => {
            toast.success("Blogs Content updated successfully");
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
        toast.success("Blogs Content created successfully");
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
          name="image"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <UploadWidget
                value={field.value || "https://avatar.vercel.sh/jane"}
                onUploadSuccess={(url) => {
                  form.setValue("image", url);
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
          name="excerpt"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Excerpt <span className="text-xs text-muted"></span>
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.data?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
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
          name="tags"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tags <span className="text-xs text-muted"></span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by comma"
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
          name="description"
          defaultValue={""}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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
