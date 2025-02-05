"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHeroSchema } from "@/db/schemas/home-content";
import type { InsertHeroType } from "@/types/contents/home";
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
import { useCreateHero, useGetHero, useUpdateHero } from "../api/use-hero";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function HeroForm({}: { onSuccess?: () => void }) {
  const { isLoading, data: formData } = useGetHero();
  const form = useForm<InsertHeroType>({
    resolver: zodResolver(insertHeroSchema),
    defaultValues: {
      backgroundImage: "",
      title: "",
      subTitle: "",
      buttonText: "",
    },
  });
  const createMutation = useCreateHero();
  const updateMutation = useUpdateHero();

  const onSubmit = (data: InsertHeroType) => {
    if (formData && formData?.data?.id) {
      updateMutation.mutate(
        { ...data, id: formData.data.id, subTitle: data.subTitle || "" },
        {
          onSuccess: () => {
            toast.success("Hero Content updated successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Hero Content created successfully");
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  useEffect(() => {
    if (formData?.data) {
      form.reset({
        backgroundImage: formData.data.backgroundImage || "",
        title: formData.data.title || "",
        subTitle: formData.data.subTitle || "",
        buttonText: formData.data.buttonText || "",
      });
    }
  }, [formData, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <FormField
          control={form.control}
          name="backgroundImage"
          render={({ field }) => (
            <FormItem>
              <UploadWidget
                className={isLoading ? "pointer-events-none" : ""}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subtitle <span className="text-xs text-muted">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter subtitle"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button text</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter button text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin mr-2" />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
