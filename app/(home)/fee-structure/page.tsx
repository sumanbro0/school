import AdmissionForm from "@/components/home/admission-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const feeStructure = [
  {
    grade: "Pre-Primary",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    description:
      "Our pre-primary program focuses on early childhood development through play-based learning.",
    fees: [
      { type: "Admission Fee", amount: "₹25,000" },
      { type: "Term Fee (Quarterly)", amount: "₹15,000" },
      { type: "Annual Fee", amount: "₹45,000" },
    ],
  },
  {
    grade: "Primary (Grade 1-5)",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000",
    description:
      "Primary education builds strong foundations in core subjects with hands-on learning experiences.",
    fees: [
      { type: "Admission Fee", amount: "₹30,000" },
      { type: "Term Fee (Quarterly)", amount: "₹20,000" },
      { type: "Annual Fee", amount: "₹55,000" },
    ],
  },
  {
    grade: "Middle School (Grade 6-8)",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1000",
    description:
      "Middle school curriculum focuses on academic excellence and personal development.",
    fees: [
      { type: "Admission Fee", amount: "₹35,000" },
      { type: "Term Fee (Quarterly)", amount: "₹25,000" },
      { type: "Annual Fee", amount: "₹65,000" },
    ],
  },
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-primary-foreground">
            Fee Structure
          </h1>
          <p className="text-center mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            Investing in your child&apos;s future through quality education
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {feeStructure.map((level, index) => (
            <Card key={index} className="mb-12 shadow-none border-0">
              <CardContent className="p-0">
                <div
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  } items-center gap-6`}
                >
                  <div className="w-full md:w-1/2">
                    <Image
                      width={384}
                      height={256}
                      src={level.image}
                      alt={level.grade}
                      className="w-full h-64 object-cover rounded-t-lg md:rounded-l-lg"
                    />
                  </div>
                  <div className="p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      {level.grade}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {level.description}
                    </p>
                    <div className="space-y-3">
                      {level.fees.map((fee, feeIndex) => (
                        <div
                          key={feeIndex}
                          className="flex justify-between items-center border-b border-border pb-2"
                        >
                          <span className="text-foreground">{fee.type}</span>
                          <span className="font-medium text-primary">
                            {fee.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="pb-12 ">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Card className="space-y-4 p-4">
            <CardTitle>Admission Enquiry</CardTitle>
            <CardDescription className="text-muted-foreground">
              All fees are subject to annual revision. Additional charges may
              apply for optional activities, transportation, and special
              programs.
            </CardDescription>
            <Separator />
            <CardContent>
              <AdmissionForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;
