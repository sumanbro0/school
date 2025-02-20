"use client";

import LightboxComponent from "@/components/home/image-lightbox";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ImageType {
  id: number;
  title: string;
  subTitle: string | null;
  imageUrl: string;
}

const ImageGallery = () => {
  const {
    data: images,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await client.api.home["image-gallery"].$get();
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">
            Failed to load images. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!images?.data?.length) {
    return (
      <div className="mx-auto text-center min-h-screen my-auto">
        Images Not found
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.data.map((image: ImageType) => (
            <LightboxComponent
              key={image.id}
              image={{
                ...image,
                subTitle: image.subTitle ?? "", // Using nullish coalescing operator
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
