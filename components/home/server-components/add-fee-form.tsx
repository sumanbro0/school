"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InsertFeeStructureWithFees,
  SelectFeeStructureWithFees,
} from "@/types/contents/home";
import { insertFeeStructureWithFeesSchema } from "@/db/schemas/fee";
import { useCreateFee, useUpdateFee } from "../api/use-fee";
import { UploadWidget } from "@/components/image-uploader";

export default function FeeStructureForm({
  initialData,
  onSuccess,
}: {
  initialData?: SelectFeeStructureWithFees | null;
  onSuccess?: () => void;
}) {
  const createMutation = useCreateFee();
  const updateMutation = useUpdateFee();

  const form = useForm<InsertFeeStructureWithFees>({
    resolver: zodResolver(insertFeeStructureWithFeesSchema),
    defaultValues: initialData
      ? {
          grade: initialData.grade,
          image: initialData.image,
          description: initialData.description,
          fees: initialData.fees.map(({ type, amount }) => ({ type, amount })),
          id: initialData.id,
        }
      : {
          grade: "",
          image: "",
          description: "",
          fees: [{ type: "", amount: "" }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fees",
  });

  const onSubmit = (data: InsertFeeStructureWithFees) => {
    if (initialData && initialData.id) {
      updateMutation.mutate(
        { ...data, id: initialData.id || 0 },
        {
          onSuccess: () => {
            toast.success("Fee structure updated successfully");
            onSuccess?.();
          },
          onError: (error) => {
            toast.error(
              error instanceof Error ? error.message : "An error occurred"
            );
          },
        }
      );
      return;
    }
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Fee structure created successfully");
        onSuccess?.();
        form.reset();
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
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
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="Enter Grade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <FormField
              control={form.control}
              name={`fees.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Fee Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`fees.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Remove Fee
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ type: "", amount: "" })}
        >
          Add Fee
        </Button>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
