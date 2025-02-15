"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPopupSchema } from "@/db/schemas/home-content";
import type { InsertPopupType } from "@/types/contents/home";
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
import { Switch } from "@/components/ui/switch";
import { UploadWidget } from "@/components/image-uploader";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreatePopup, useGetPopup, useUpdatePopup } from "../api/use-popup";

export default function PopupForm({}: { onSuccess?: () => void }) {
  const { isLoading, data: formData } = useGetPopup();
  const form = useForm<InsertPopupType>({
    resolver: zodResolver(insertPopupSchema),
    defaultValues: {
      image: "",
      title: "",
      subTitle: "",
      descreption: "",
      buttonText: "",
      href: "",
      isActive: true,
    },
  });
  const createMutation = useCreatePopup();
  const updateMutation = useUpdatePopup();

  const onSubmit = (data: InsertPopupType) => {
    if (formData && formData?.data?.id) {
      updateMutation.mutate(
        {
          ...data,
          id: formData.data.id,
          subTitle: data.subTitle || "",
          isActive: data.isActive || false,
        },
        {
          onSuccess: () => {
            toast.success("Popup Content updated successfully");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Popup Content created successfully");
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
        image: formData.data.image || "",
        title: formData.data.title || "",
        subTitle: formData.data.subTitle || "",
        descreption: formData.data.descreption || "",
        buttonText: formData.data.buttonText || "",
        href: formData.data.href || "",
        isActive: formData.data.isActive || false,
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <UploadWidget
                className={isLoading ? "pointer-events-none" : ""}
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
                Subtitle{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
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

        <FormField
          control={form.control}
          name="descreption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Enter description"
                  className="min-h-[100px]"
                  {...field}
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

          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Link</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter button link (e.g., /about)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Enable or disable this popup
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
