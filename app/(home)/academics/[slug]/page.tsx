import { getSlugPage } from "@/actions/get-slug-page";
import parse, { Element } from "html-react-parser";
import Image from "next/image";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

import "ckeditor5/ckeditor5-content.css";

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch page data
  const pageData = await getSlugPage(params.slug);

  // Get the parent metadata (optional)
  const previousImages = (await parent).openGraph?.images || [];

  // Return default metadata if page not found
  if (!pageData) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: pageData.metaTitle || pageData.title || "Untitled Page",
    description: pageData.metaDescription || "No description available",
    openGraph: {
      title: pageData.metaTitle || pageData.title || "Untitled Page",
      description: pageData.metaDescription || "No description available",
      images: [pageData.banner, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metaTitle || pageData.title || "Untitled Page",
      description: pageData.metaDescription || "No description available",
      images: [pageData.banner],
    },
  };
}

const Pages = async (props: Props) => {
  const pageData = await getSlugPage(props.params.slug);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const options = {
    replace: (domNode: unknown) => {
      if (domNode instanceof Element && domNode.name === "figure") {
        const className = domNode.attribs?.class || "";
        let alignmentClass = "mx-auto"; // Default center alignment

        // Check for CKEditor's default alignment classes
        if (
          className.includes("ck-align-left") ||
          (className.includes("image_resized") &&
            className.includes("image-style-align-left"))
        ) {
          alignmentClass = "float-left mr-4";
        } else if (
          className.includes("ck-align-right") ||
          (className.includes("image_resized") &&
            className.includes("image-style-align-right"))
        ) {
          alignmentClass = "float-right ml-4";
        } else if (className.includes("image-style-align-center")) {
          alignmentClass = "flex justify-center";
        }
        const imgChild = domNode.children.find(
          (child) => child instanceof Element && child.name === "img"
        ) as Element;

        if (imgChild) {
          const { src, alt, width, height } = imgChild.attribs;

          if (src === pageData.banner) return null;

          return (
            <figure className={`my-8 ${alignmentClass}`}>
              <Image
                src={src}
                alt={alt || ""}
                width={width ? parseInt(width) : 1200}
                height={height ? parseInt(height) : 800}
                className="max-w-full h-auto"
                quality={90}
              />
              {domNode.children.map((child, index) => {
                if (child instanceof Element && child.name === "figcaption") {
                  return (
                    <figcaption
                      key={index}
                      className="text-center mt-2 text-sm text-gray-600"
                    >
                      {parse(child.toString())}
                    </figcaption>
                  );
                }
                return null;
              })}
            </figure>
          );
        }
      }

      return undefined;
    },
  };

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px]">
        <Image
          src={
            pageData.banner ||
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
          }
          alt="Page Banner"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="ck-content">
          {pageData.title && (
            <h1 className="text-4xl font-bold mb-8">{pageData.title}</h1>
          )}
          {parse(pageData.content, options)}
        </article>
      </div>
    </div>
  );
};

export default Pages;
