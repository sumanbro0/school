import AdmissionForm from "@/components/home/admission-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { client } from "@/lib/hono";
import Image from "next/image";
import React from "react";

async function App() {
  const data = await client.api.fees.$get();

  if (!data.ok) {
    throw new Error("An error occurred");
  }

  const { feeStructures } = await data.json();

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
          {feeStructures.map((level, index) => (
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
                      src={
                        level.feeStructure.image ||
                        "https://avatar.vercel.sh/jane"
                      }
                      alt={level.feeStructure.grade}
                      className="w-full h-64 object-cover rounded-t-lg md:rounded-l-lg"
                    />
                  </div>
                  <div className="p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      {level.feeStructure.grade}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {level.feeStructure.description}
                    </p>
                    <div className="space-y-3">
                      {level.fees.map((fee, feeIndex) => (
                        <div
                          key={feeIndex}
                          className="flex justify-between items-center border-b border-border pb-2"
                        >
                          <span className="text-foreground">{fee.type}</span>
                          <span className="font-medium text-primary">
                            ₹ {fee.amount}
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
