import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const categories = [
  "All",
  "Academic",
  "Sports",
  "Arts",
  "Events",
  "Student Life",
  "Achievement",
];

const blogPosts = [
  {
    id: 1,
    title: "Annual Science Fair Highlights Student Innovation",
    category: "Academic",
    publisher: "John Smith",
    date: "March 15, 2024",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    description:
      "Our annual science fair showcased incredible projects from students across all grades, demonstrating innovation and scientific thinking...",
  },
  // Add more blog posts as needed
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Category Slider */}
        <ScrollArea className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-8">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="secondary"
                className="rounded-full whitespace-nowrap first:bg-primary first:text-primary-foreground hover:text-primary-foreground hover:bg-primary"
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="p-0">
                <Image
                  height={200}
                  width={325}
                  src={post.image}
                  alt={post.title}
                  className="relative aspect-video w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-sm text-primary mb-2">{post.category}</div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  By {post.publisher} | {post.date}
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                <Button variant="link" className="p-0">
                  Read More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}