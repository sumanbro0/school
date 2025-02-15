import { getSlugPage } from "@/actions/get-slug-page";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const Pages = async (props: Props) => {
  const pageData = await getSlugPage(props.params.slug);
  if (!pageData) {
    return <div>Page not found</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              pageData.banner || "https://avatar.vercel.sh/jane"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MarkdownRenderer
          className="flex flex-col space-y-4"
          content={pageData.content}
        />
      </div>
    </div>
  );
};

export default Pages;
