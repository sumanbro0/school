import { client } from "@/lib/hono";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const BlogDetail = async ({ params }: Props) => {
  const blog = await client.api.blogs[":id"].$get({
    param: {
      id: params.id,
    },
  });

  if (!blog.ok) {
    throw new Error("An error occurred");
  }

  const data = await blog.json();

  if (!data || !data.data) {
    <div className="mx-auto text-center min-h-screen my-auto">
      No Blogs Found
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Banner Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.data.image})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {data.data.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
              {data.data.category}
            </span>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300">
              {data.data.excerpt}
            </p>
            <div className="mb-8 text-gray-600 dark:text-gray-400">
              {data.data.description}
            </div>
          </div>

          {data.data.tags && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.data.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
