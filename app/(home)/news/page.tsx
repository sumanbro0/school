"use client";
import { useGetBlogs } from "@/components/home/api/use-blogs";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  // const { data: categories } = useGetCategories();
  const { data: blogPosts, isLoading } = useGetBlogs();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Category Slider */}
      {/* <ScrollArea className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-8">
        <div className="flex space-x-4">
          {categories?.data.map((category) => (
            <Button
              key={category.id}
              variant="secondary"
              className="rounded-full whitespace-nowrap first:bg-primary first:text-primary-foreground hover:text-primary-foreground hover:bg-primary"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea> */}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.data.map((post) => (
            <Card key={post.id}>
              <CardHeader className="p-0">
                <Image
                  height={200}
                  width={325}
                  src={post.image || "#"}
                  alt={post.title}
                  className="relative aspect-video w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/blogs/${post.id}`}>
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
