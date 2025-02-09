// components/TestimonialGallery.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { TestimonialType } from "@/db/schemas/testimonials";
import { useGetTestimonials } from "../api/use-testimonial";
import TestimonialFormModal from "./testimonial-form-modal";

const TestimonialGallery = () => {
  const [open, setOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState<TestimonialType | null>(
    null
  );
  const { data } = useGetTestimonials();

  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Testimonials</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={24} />
            Add Testimonial
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card key={d.id}>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d.name}</CardTitle>
                <CardDescription>
                  {d.position} at {d.company}
                </CardDescription>
              </div>
              <Button
                onClick={() => {
                  setInitialData(d);
                  setOpen(true);
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <Edit size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <TestimonialFormModal
        initialData={initialData}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default TestimonialGallery;
