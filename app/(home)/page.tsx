import AdmissionForm from "@/components/home/admission-form";
import { AdmissionProcess } from "@/components/home/admission-process";
import TriggerFormModal from "@/components/home/trigger-form-modal";
import { TrustedSection } from "@/components/home/trusted-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { BookOpen, GraduationCap, MapPin, Phone, School } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background container">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary to-blue-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">
            Welcome to Orchids International School
          </h1>
          <p className="mb-8 text-xl">
            Nurturing Excellence, Building Future Leaders
          </p>

          <TriggerFormModal />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center my-16">
          School Admission In Mumbai 2025-26
        </h2>
        <p>
          School Admission in Mumbai is highly competitive due to the rampant
          population. With many choices at hand, selecting the right school for
          a child is not an easy thing to do. Some of the influences that have a
          say in admission into schools in Mumbai include the syllabus of the
          school, infrastructure, location, reputation, and ...
          <span className="text-red-700">show more</span>
        </p>
        <Button
          className="max-w-sm mx-auto bg-black hover:bg-black/70"
          size="lg"
        >
          Learn more
        </Button>
      </div>
      <TrustedSection />
      <AdmissionProcess />
      {/* Features Section */}
      <section className="py-16 flex flex-col gap-10 bg-gray-50">
        <h1 className="text-black font-semibold text-3xl text-center">
          Why To Choose Us?
        </h1>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-6 text-center">
              <School className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                World-Class Education
              </h3>
              <p className="text-muted-foreground">
                State-of-the-art facilities and modern teaching methodologies
              </p>
            </Card>
            <Card className="p-6 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">
                Holistic Development
              </h3>
              <p className="text-muted-foreground">
                Focus on academics, sports, arts, and character building
              </p>
            </Card>
            <Card className="p-6 text-center">
              <GraduationCap className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Expert Faculty</h3>
              <p className="text-muted-foreground">
                Experienced teachers dedicated to student success
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section id="admission-form" className=" py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Admission Enquiry
          </h2>
          <Card className="mx-auto max-w-2xl p-6">
            <AdmissionForm />
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p>123 Education Street, Mumbai, Maharashtra 400001</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <p>+91 1234567890</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">School Timings</h2>
              <div className="space-y-2">
                <p>Monday - Friday: 8:00 AM - 3:00 PM</p>
                <p>Saturday: 8:00 AM - 12:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
