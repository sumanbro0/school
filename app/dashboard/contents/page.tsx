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
      <TabsList>
        <TabsTrigger value="hero">Hero</TabsTrigger>
        <TabsTrigger value="welcome">Welcome</TabsTrigger>
        <TabsTrigger value="highlight">Highlight</TabsTrigger>
        <TabsTrigger value="popup">Popups</TabsTrigger>
        <TabsTrigger value="vgallery">Video Gallery</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="fees">Fee Structures</TabsTrigger>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="pages">Extra</TabsTrigger>
      </TabsList>
      <TabsContent value="hero" className="p-4">
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
    </Tabs>
  );
};

export default Page;
