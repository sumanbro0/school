"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroForm from "@/components/home/server-components/hero-form";
import WelcomeForm from "@/components/home/server-components/welcome-form";
import Highlight from "@/components/home/server-components/highlight";
import VideoGallery from "@/components/home/server-components/video-gallery";
import ImageGallery from "@/components/home/server-components/gallery";

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
        <TabsTrigger value="vgallery">Video Gallery</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
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
      <TabsContent value="vgallery">
        <VideoGallery />
      </TabsContent>
      <TabsContent value="gallery">
        <ImageGallery />
      </TabsContent>
    </Tabs>
  );
};

export default Page;
