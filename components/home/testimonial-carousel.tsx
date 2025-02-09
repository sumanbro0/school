// components/TestimonialCarousel.tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTestimonials } from "./api/use-testimonial";

export function TestimonialCarousel() {
  const { data, isLoading, error } = useGetTestimonials();

  if (isLoading) {
    return <TestimonialSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const testimonials = data?.data || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage
                    src={
                      testimonial.avatarUrl || "https://avatar.vercel.sh/kim"
                    }
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <blockquote className="text-center italic mb-4">
                  &apos;{testimonial.content}&apos;
                </blockquote>
                <cite className="not-italic font-medium">
                  {testimonial.name}
                </cite>
                <p className="text-sm text-muted-foreground">
                  {testimonial.position}{" "}
                  {(testimonial.company?.length || 0) > 0 && "at"}{" "}
                  {testimonial.company}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Skeleton className="w-20 h-20 rounded-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/3 mb-1" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    </div>
  );
}
