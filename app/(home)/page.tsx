import AdmissionForm from "@/components/home/admission-form";
import { AdmissionProcess } from "@/components/home/admission-process";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import TriggerFormModal from "@/components/home/trigger-form-modal";
import WhyChooseUs from "@/components/home/why-choose-us";
import CarouselSection from "@/components/shared/gallery-carousel";
import GridSection from "@/components/shared/grid";
import Section from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { client } from "@/lib/hono";
import { HeroType } from "@/types/contents/home";
import React, { Suspense } from "react";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-12 w-12 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <div className="text-red-500 text-xl font-semibold">{message}</div>
  </div>
);

const HeroSection = ({ data }: { data: HeroType }) => (
  <section
    className="relative h-[700px] bg-gradient-to-r from-primary to-blue-600 bg-cover bg-center"
    style={{
      backgroundImage: `url(${data.backgroundImage})`,
    }}
  >
    <div className="absolute inset-0 bg-black/60" />
    <div className="container relative z-10 mx-auto pt-80 flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
      {data.title && (
        <h1 className="mb-6 text-3xl md:text-5xl font-bold tracking-tight">
          {data.title}
        </h1>
      )}
      <p className="mb-8 text-lg md:text-xl max-w-2xl">{data.subTitle}</p>
      <TriggerFormModal
        className="px-8 py-3 bg-[#d19c1f] hover:bg-[#ac811b] text-gray-50 transition-colors duration-300 rounded-lg font-medium"
        triggerText={data.buttonText ? `${data.buttonText} →` : undefined}
      />
    </div>
  </section>
);

export default async function Home() {
  try {
    const [
      heroData,
      welcomeData,
      highlightsData,
      videoGalleryData,
      imageGalleryData,
    ] = await Promise.all([
      client.api.home.hero.$get(),
      client.api.home.welcome.$get(),
      client.api.home.highlights.$get(),
      client.api.home["video-gallery"].$get(),
      client.api.home["image-gallery"].$get(),
    ]);

    const data = await heroData.json();
    const welcome = await welcomeData.json();
    const highlights = await highlightsData.json();
    const videoGallery = await videoGalleryData.json();
    const imgdata = await imageGalleryData.json();

    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={<LoadingFallback />}>
          {heroData && <HeroSection data={data.data} />}

          <div className="mx-auto max-w-7xl px-4">
            <div className="space-y-32 py-16">
              {welcome?.data && (
                <Section
                  description={welcome.data.descreption}
                  imageSrc={welcome.data.backgroundImage}
                  title={welcome.data.title}
                  titlePosition="top"
                  subtitle={welcome.data.subTitle || ""}
                />
              )}

              {highlights.data && (
                <GridSection
                  title="Highlights"
                  subtitle="Check out our latest events and activities"
                  columns={3}
                  data={highlights.data.map((d) => ({
                    title: d.title,
                    imageUrl: d.backgroundImage,
                    excerpt: d.subTitle || "",
                    content: d.descreption,
                    id: d.id,
                    slug: d.id.toString(),
                  }))}
                />
              )}

              {videoGallery.data && (
                <CarouselSection
                  itemsPerView={1}
                  sectionTitle="Video Gallery"
                  sectionSubtitle="Watch our latest videos and events"
                  items={videoGallery.data.map((d) => ({
                    title: d.title,
                    caption: d.subTitle || "",
                    mediaUrl: d.videoUrl || "https://youtu.be/Xj054r2-qNs",
                    mediaType: "video",
                    id: d.id.toString(),
                  }))}
                />
              )}

              {imgdata.data && (
                <CarouselSection
                  itemsPerView={3}
                  sectionTitle="Image Gallery"
                  sectionSubtitle="Watch our latest events"
                  items={imgdata.data.map((d) => ({
                    title: d.title,
                    caption: d.subTitle || "",
                    mediaUrl: d.imageUrl || "https://avatar.vercel.sh/jane",
                    mediaType: "image",
                    id: d.id.toString(),
                  }))}
                />
              )}
              <AdmissionProcess />
              <WhyChooseUs />

              <section className="bg-gray-50 rounded-2xl overflow-hidden">
                <div className="py-16 flex flex-col gap-10">
                  <div className="container mx-auto max-w-6xl px-4">
                    <h2 className="text-center text-3xl font-semibold mb-2">
                      Testimonials
                    </h2>
                    <p className="text-center text-gray-600">
                      What our members say about us
                    </p>
                  </div>
                  <TestimonialCarousel />
                </div>
              </section>

              <section id="admission-form" className="py-16">
                <div className="container mx-auto max-w-6xl px-4">
                  <h2 className="mb-12 text-center text-3xl font-bold">
                    Admission Enquiry
                  </h2>
                  <Card className="mx-auto max-w-2xl p-8 shadow-lg rounded-xl">
                    <AdmissionForm />
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </Suspense>
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    return <ErrorDisplay message="Something went wrong" />;
  }
}
