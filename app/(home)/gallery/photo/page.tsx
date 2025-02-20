import LightboxComponent from "@/components/home/image-lightbox";
import { client } from "@/lib/hono";
import React from "react";

const ImageGallery = async () => {
  const pageData = await client.api.home["image-gallery"].$get();
  //
  // data: {
  //   id: number;
  //   title: string;
  //   subTitle: string | null;
  //   imageUrl: string;
  // }
  // [];
  if (!pageData.ok) {
    return <div>Page not found</div>;
  }

  const images = await pageData.json();

  if (!images || !images.data) {
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
          {images.data.map((image) => (
            <LightboxComponent
              image={{ ...image, subTitle: image.subTitle || "" }}
              key={image.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
