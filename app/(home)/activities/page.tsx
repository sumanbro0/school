"use client";
import { useGetActivities } from "@/components/home/api/use-blogs";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Activities() {
  // const { data: categories } = useGetCategories();
  const { data: activities, isLoading } = useGetActivities();
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
          {activities?.data.map((activity) => (
            <Card key={activity.id} className="group overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    fill
                    src={activity.image || "https://avatar.vercel.sh/128"}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {activity.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activity?.tags?.split(",").map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="ml-auto group">
                  <Link href={`/activities/${activity.id}`}>
                    Learn More{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
