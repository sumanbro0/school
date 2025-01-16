"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

const steps = [
  {
    title: "Get in touch",
    description: "Connect with our admissions team to start your journey",
  },
  {
    title: "Campus visit",
    description: "Experience our world-class facilities firsthand",
  },
  {
    title: "Application form",
    description: "Complete the admission application process",
  },
  {
    title: "Submit documents",
    description: "Provide necessary academic and personal documents",
  },
  {
    title: "Receive enrollment no.",
    description: "Get your unique student enrollment number",
  },
  {
    title: "Yay! ⚡️ Start learning",
    description: "Begin your educational journey with us",
  },
];

export function AdmissionProcess() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="my-10 flex flex-col gap-10">
      <h3 className="text-center text-2xl font-bold mb-8">
        School Admission Process In Mumbai
      </h3>

      {/* Steps Progress */}
      <div className="w-full  flex  flex-col md:justify-center md:items-center px-4 relative ">
        <div className="flex  md:items-center md:flex-row flex-col md:justify-center justify-end  cursor-pointer relative md:h-auto h-[400px] gap-4 md:gap-1 ">
          <div className=" absolute left-8 z-10 top-0  h-full w-0.5 rounded-full bg-gradient-to-b from-slate-200 to-slate-400"></div>
          {/* Current Step Details */}
          <div className="absolute md:hidden left-20 top-8 text-center mb-8">
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>
          {steps.map((step, index) => (
            <div className="flex items-center" key={index}>
              <span
                className={cn(
                  "min-w-8 w-7 h-0.5 bg-gradient-to-r from-slate-200 to-gray-400 ",
                  index > 0 ? "md:flex hidden" : "hidden"
                )}
              />
              <Badge
                onClick={() => setCurrentStep(index)}
                variant={index <= currentStep ? "default" : "secondary"}
                className="py-2 rounded-2xl z-20 "
                key={index}
              >
                <span>{step.title}</span>
              </Badge>
            </div>
          ))}
        </div>

        {/* Current Step Details */}
        <div className="hidden md:block text-center my-8">
          <p className="text-muted-foreground">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="text-center mt-4">
          <Button
            variant="ghost"
            className="text-primary hover:text-[#8B1624] font-bold text-xl"
          >
            Contact Us <ChevronRight className="!h-5 !w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
