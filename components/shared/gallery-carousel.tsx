"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ContentModal from "./content-modal";
import { cn } from "@/lib/utils";

export type CarouselItem = {
  id: string | number;
  title: string;
  caption: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  buttonText?: string;
};

type CarouselSectionProps = {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: CarouselItem[];
  className?: string;
  itemsPerView: number;
};

const CarouselSection: React.FC<CarouselSectionProps> = ({
  sectionTitle,
  sectionSubtitle,
  items,
  className = "",
  itemsPerView = 3,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);

  const openModal = (item: CarouselItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderMedia = (item: CarouselItem) => {
    if (item.mediaType === "video") {
      const videoId = getYouTubeVideoId(item.mediaUrl);
      const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/0.jpg`
        : "/path/to/fallback-image.jpg"; // Replace with your fallback image path
      return (
        <Image
          src={thumbnailUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          objectPosition="top center"
          className="rounded-lg"
        />
      );
    } else {
      return (
        <Image
          src={item.mediaUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      );
    }
  };

  const getItemClass = () => {
    switch (itemsPerView) {
      case 1:
        return "basis-full";
      case 2:
        return "basis-full sm:basis-1/2";
      case 3:
        return "basis-full sm:basis-1/2 lg:basis-1/3";
      case 4:
        return "basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";
      default:
        return "basis-full sm:basis-1/2 lg:basis-1/3";
    }
  };

  return (
    <section className={cn("py-8 sm:py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-lg sm:text-xl text-gray-600">
              {sectionSubtitle}
            </p>
          )}
        </div>

        <Carousel className="w-full mx-auto">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className={cn("pl-2 sm:pl-4", getItemClass())}
              >
                <Card
                  className="relative h-[300px] sm:h-[400px] cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <CardContent className="p-0 h-full">
                    {renderMedia(item)}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center p-3 sm:p-4 rounded-lg">
                      <h3 className="text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white text-xs sm:text-sm mb-2 sm:mb-4">
                        {item.caption}
                      </p>
                      {item.buttonText && (
                        <span className="text-white text-xs sm:text-sm underline">
                          {item.buttonText}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <ContentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedItem?.title || ""}
          mediaType={selectedItem?.mediaType}
          mediaUrl={selectedItem?.mediaUrl}
        />
      </div>
    </section>
  );
};

export default CarouselSection;
