"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroForm from "@/components/home/server-components/hero-form";
import WelcomeForm from "@/components/home/server-components/welcome-form";
import Highlight from "@/components/home/server-components/highlight";
import VideoGallery from "@/components/home/server-components/video-gallery";
import ImageGallery from "@/components/home/server-components/gallery";
import BlogsCms from "@/components/home/server-components/blogs";
import ActivitiesCms from "@/components/home/server-components/activities";
import FeesCms from "@/components/home/server-components/fees";
import TestimonialGallery from "@/components/home/server-components/testimonial";
import PagesCms from "@/components/home/server-components/pages";
import PopupForm from "@/components/home/server-components/popup-form";

const Page = () => {
  return (
    <Tabs
      defaultValue="hero"
      onValueChange={(value) => {
        console.log(value);
      }}
      className="w-full"
    >
      <TabsList className="flex flex-wrap justify-start h-auto gap-2 p-2">
        <TabsTrigger className="text-sm " value="hero">
          Hero
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="welcome">
          Welcome
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="highlight">
          Highlight
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="popup">
          Popups
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="vgallery">
          Video Gallery
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="gallery">
          Gallery
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="blogs">
          Blogs
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="activities">
          Activities
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="fees">
          Fee Structures
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="testimonials">
          Testimonials
        </TabsTrigger>
        <TabsTrigger className="text-sm " value="pages">
          Extra
        </TabsTrigger>
      </TabsList>

      <div className="p-2 md:p-4">
        <TabsContent value="hero">
          <HeroForm />
        </TabsContent>
        <TabsContent value="welcome">
          <WelcomeForm />
        </TabsContent>
        <TabsContent value="highlight">
          <Highlight />
        </TabsContent>
        <TabsContent value="popup">
          <PopupForm />
        </TabsContent>
        <TabsContent value="vgallery">
          <VideoGallery />
        </TabsContent>
        <TabsContent value="gallery">
          <ImageGallery />
        </TabsContent>
        <TabsContent value="blogs">
          <BlogsCms />
        </TabsContent>
        <TabsContent value="activities">
          <ActivitiesCms />
        </TabsContent>
        <TabsContent value="fees">
          <FeesCms />
        </TabsContent>
        <TabsContent value="testimonials">
          <TestimonialGallery />
        </TabsContent>
        <TabsContent value="pages">
          <PagesCms />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Page;
