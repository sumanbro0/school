import AdmissionForm from "@/components/home/admission-form";
import { AdmissionProcess } from "@/components/home/admission-process";
import TriggerFormModal from "@/components/home/trigger-form-modal";
import CarouselSection from "@/components/shared/gallery-carousel";
import GridSection from "@/components/shared/grid";
import Section from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/hono";

import { BookOpen, GraduationCap, School } from "lucide-react";
import React from "react";

export default async function Home() {
  const heroData = await client.api.home.hero.$get();
  if (!heroData.ok) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Failed to fetch hero data</p>
        <pre>{heroData.text()}</pre>
      </div>
    );
  }
  const data = await heroData.json();
  const welcomeData = await (await client.api.home.welcome.$get()).json();
  const highlightsData = await (await client.api.home.highlights.$get()).json();
  const videoGalleryData = await (
    await client.api.home["video-gallery"].$get()
  ).json();

  const imageGalleryData = await client.api.home["image-gallery"].$get();
  if (!imageGalleryData.ok) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Failed to fetch hero data</p>
        <pre>{imageGalleryData.text()}</pre>
      </div>
    );
  }

  const imgdata = await imageGalleryData.json();

  return (
    <div className="min-h-screen bg-background mx-auto">
      {/* Hero Section */}
      <section
        className="relative h-[700px]  bg-gradient-to-r from-primary to-blue-600 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.data.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 mx-auto pt-80 flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
          {data.data.title && (
            <h1 className="mb-6 text-5xl font-bold">{data.data.title}</h1>
          )}
          <p className="mb-8 text-xl">{data.data.subTitle}</p>
          <TriggerFormModal
            className="bg-[#d19c1f] hover:bg-[#ac811b] text-gray-50"
            triggerText={data.data.buttonText + " ->" || undefined}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 flex flex-col ">
        <Section
          description={welcomeData.data.descreption}
          imageSrc={welcomeData.data.backgroundImage}
          title={welcomeData.data.title}
          titlePosition="top"
          subtitle={welcomeData.data.subTitle || ""}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 flex flex-col ">
        <GridSection
          title="Highlights"
          subtitle="Check out our latest events and activities"
          columns={3}
          data={highlightsData.data.map((d) => {
            return {
              title: d.title,
              imageUrl: d.backgroundImage,
              excerpt: d.subTitle || "",
              content: d.descreption,
              id: d.id,
              slug: d.id.toString(),
            };
          })}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 flex flex-col  ">
        <CarouselSection
          itemsPerView={1}
          sectionTitle="Video Gallery"
          sectionSubtitle="Watch our latest videos and events"
          items={videoGalleryData.data.map((d) => {
            return {
              title: d.title,
              caption: d.subTitle || "",
              mediaUrl: d.videoUrl || "https://youtu.be/Xj054r2-qNs",
              mediaType: "video",
              id: d.id.toString(),
            };
          })}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 flex flex-col  ">
        <CarouselSection
          itemsPerView={3}
          sectionTitle="Image Gallery"
          sectionSubtitle="Watch our latest  events"
          items={imgdata.data.map((d) => {
            return {
              title: d.title,
              caption: d.subTitle || "",
              mediaUrl: d.imageUrl || "https://avatar.vercel.sh/jane",
              mediaType: "image",
              id: d.id.toString(),
            };
          })}
        />
      </div>
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
    </div>
  );
}
