"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
// import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEnquirySchema } from "@/db/schemas/enquery-form";
import { InsertEnquery } from "@/types/enquery";
import { useCreateEnquiry } from "@/server/enquiry";
import { toast } from "sonner";

type FormValues = InsertEnquery;

const AdmissionForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(insertEnquirySchema),
  });
  const enquiryMutation = useCreateEnquiry();
  // Handle Select onChange events
  const handleSelectChange = (field: keyof FormValues, value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    enquiryMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Enquiry submitted successfully");
        onSuccess?.();
      },
      onError: () => {
        toast.error("An error occurred");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            {...register("studentName")}
            placeholder="Enter student name"
          />
          {errors.studentName && (
            <p className="text-sm text-red-500">{errors.studentName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade Applying For</Label>
          <Select onValueChange={(value) => handleSelectChange("grade", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nursery">Nursery</SelectItem>
              <SelectItem value="kg">Kindergarten</SelectItem>
              <SelectItem value="1">Grade 1</SelectItem>
              <SelectItem value="2">Grade 2</SelectItem>
              <SelectItem value="3">Grade 3</SelectItem>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-sm text-red-500">{errors.grade.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentName">Parent Name</Label>
          <Input
            id="parentName"
            {...register("parentName")}
            placeholder="Enter parent name"
          />
          {errors.parentName && (
            <p className="text-sm text-red-500">{errors.parentName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredLocation">Preferred Location</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("preferredLocation", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="andheri">Andheri</SelectItem>
              <SelectItem value="bandra">Bandra</SelectItem>
              <SelectItem value="juhu">Juhu</SelectItem>
              <SelectItem value="thane">Thane</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredLocation && (
            <p className="text-sm text-red-500">
              {errors.preferredLocation.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={enquiryMutation.isPending}
      >
        {enquiryMutation.isPending ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
};

export default AdmissionForm;
