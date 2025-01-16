import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSchoolSchema } from "@/db/schemas/school";
import FileUpload from "../file-upload";
import { InsertSchool, School } from "@/types/school";

interface SchoolFormProps {
  school?: School;
  onSubmit: (data: InsertSchool, file?: File) => Promise<void>;
  isLoading?: boolean;
}

export default function SchoolForm({
  school,
  onSubmit,
  isLoading = false,
}: SchoolFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(school?.logo ?? "");

  const form = useForm<InsertSchool>({
    resolver: zodResolver(insertSchoolSchema),
    defaultValues: {
      name: school?.name ?? "",
      address: school?.address ?? "",
      phone: school?.phone ?? "",
      email: school?.email ?? "",
      logo: school?.logo ?? "",
      logoLabel: school?.logoLabel ?? "",
    },
  });

  useEffect(() => {
    if (school) {
      form.reset({
        name: school.name,
        address: school.address,
        phone: school.phone,
        email: school.email,
        logo: school.logo,
        logoLabel: school.logoLabel,
      });

      setPreviewUrl(school.logo);
    }
  }, [school, form]);

  const handleSubmit = async (values: InsertSchool) => {
    try {
      await onSubmit(values, selectedFile ?? undefined);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    form.setValue("logo", "");
  };

  return (
    <div className="rounded-lg shadow-sm border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Logo Preview and Upload */}
          <FileUpload
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
            onRemove={handleRemoveFile}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter school name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logoLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter logo label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Enter logo URL"
                      {...field}
                      disabled={!!selectedFile}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter school address"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto bg-black hover:bg-black/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
