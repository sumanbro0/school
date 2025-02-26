"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { insertAdmissionSchema } from "@/db/schemas/admission";
import { insertAdmission as InsertAdmission } from "@/types/school";
import { UploadWidget } from "../image-uploader";
import { useCreateRegistration } from "@/server/registration";
import { toast } from "sonner";

const RegistrationForm = () => {
  const createMutation = useCreateRegistration();
  const form = useForm<InsertAdmission>({
    disabled: createMutation.isPending,
    resolver: zodResolver(insertAdmissionSchema),
    defaultValues: {
      class: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      gender: "",
      mobileNumber: "",
      email: "",
      studentPhotoUrl: "",
      fatherName: "",
      motherName: "",
      guardianPhotoUrl: "",
      guardianType: "Father",
      guardianName: "",
      guardianRelation: "",
      guardianEmail: "",
      guardianPhone: "",
      guardianOccupation: "",
      guardianAddress: "",
      isGuardianAddressCurrent: false,
      currentAddress: "",
      isPermanentAddressCurrent: false,
      permanentAddress: "",
      nationalIdNumber: "",
      localIdNumber: "",
      previousSchoolDetails: "",
      documentsUrl: "",
    },
  });

  function onSubmit(values: InsertAdmission) {
    console.log(form.getValues());
    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Registration successful");
        form.reset();
      },
    });
  }

  return (
    <div className="container w-full h-full mx-auto py-6 ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Student Registration Form
          </CardTitle>
          <CardDescription>
            Please fill all the required fields marked with *
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Basic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-muted/30 p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Class *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          {...field}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              disabled={createMutation.isPending}
                              className="bg-background"
                            >
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i} value={`${i + 1}`}>
                                Class {i + 1}
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
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          First Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="First name"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Last name"
                            className="bg-background"
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Gender *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium">
                          Date of Birth *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(d) =>
                                field.onChange(d?.toDateString())
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Mobile number"
                            className="bg-background"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Email *</FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            type="email"
                            placeholder="Email"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    disabled={createMutation.isPending}
                    name="studentPhotoUrl"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-3">
                        <FormLabel className="font-medium">
                          Student Photo
                        </FormLabel>
                        <FormControl>
                          <UploadWidget
                            variant="image"
                            onUploadSuccess={(url) => {
                              field.onChange(url);
                            }}
                            inline
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Parent Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Parent Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Father&apos;s Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter father's name"
                            className="bg-background"
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
                    name="motherName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Mother&apos;s Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter mother's name"
                            className="bg-background"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Guardian Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Guardian Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-muted/30 p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name="guardianType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-medium">
                          If Guardian Is *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Father" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Father
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Mother" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Mother
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Guardian Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter guardian's name"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianRelation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Guardian Relation *
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="E.g. Uncle, Aunt, etc."
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Guardian Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            type="email"
                            placeholder="Enter guardian's email"
                            className="bg-background"
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
                    name="guardianPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Guardian Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter guardian's phone"
                            className="bg-background"
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
                    name="guardianOccupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Guardian Occupation
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter guardian's occupation"
                            className="bg-background"
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
                    disabled={createMutation.isPending}
                    name="guardianPhotoUrl"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-3">
                        <FormLabel className="font-medium">
                          Guardian Photo
                        </FormLabel>
                        <FormControl>
                          <UploadWidget
                            key={form.watch("guardianPhotoUrl")}
                            onUploadSuccess={(url) => {
                              field.onChange(url);
                            }}
                            variant="image"
                            inline
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
                    name="guardianAddress"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
                        <FormLabel className="font-medium">
                          Guardian Address
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter guardian's complete address"
                            className="resize-none bg-background min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Address Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Student Address Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-4 rounded-lg">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isGuardianAddressCurrent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              Guardian Address Is Current Address
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Current Address
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter student's current residential address"
                              className="resize-none min-h-32 bg-background"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isPermanentAddressCurrent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              Permanent Address Is Current Address
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permanentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Permanent Address
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter student's permanent address"
                              className="resize-none min-h-32 bg-background"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Miscellaneous Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Miscellaneous Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name="nationalIdNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          National Identification Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter national ID number"
                            className="bg-background"
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
                    name="localIdNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Local Identification Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={createMutation.isPending}
                            placeholder="Enter local ID number"
                            className="bg-background"
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
                    name="previousSchoolDetails"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="font-medium">
                          Previous School Details
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter details about previous school attended"
                            className="resize-none bg-background min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Document Upload Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-primary">
                  Upload Documents
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <FormField
                    disabled={createMutation.isPending}
                    control={form.control}
                    name="documentsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Supporting Documents
                        </FormLabel>
                        <FormControl>
                          <UploadWidget
                            key={form.watch("guardianPhotoUrl")}
                            variant="file"
                            onUploadSuccess={(url) => {
                              field.onChange(url);
                            }}
                            helpText="To upload multiple documents, compress them into a single file"
                            inline
                            className="max-w-xl"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription className="mt-2 text-sm">
                          Accepted formats: PDF, ZIP, RAR (max 10MB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  {form.formState.disabled && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Submit Registration
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
