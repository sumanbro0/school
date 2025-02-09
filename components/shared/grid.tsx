"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserIcon } from "lucide-react";
import { CardData } from "@/types/contents/home";

type GridSectionProps = {
  title: string;
  subtitle?: string;
  data: CardData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "small" | "medium" | "large";
};

const GridSection = ({
  title,
  subtitle,
  data,
  className = "",
  columns = 3,
  gap = "medium",
}: GridSectionProps) => {
  const getGridCols = () => {
    const cols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };
    return cols[columns];
  };

  const getGapSize = () => {
    const gaps = {
      small: "gap-4",
      medium: "gap-6",
      large: "gap-8",
    };
    return gaps[gap];
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`grid ${getGridCols()} ${getGapSize()}`}>
          {data.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {item.imageUrl && (
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    {item.category && (
                      <Badge className="absolute top-4 right-4 bg-primary text-white">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  {item.excerpt && (
                    <CardDescription className="mb-4 line-clamp-3">
                      {item.excerpt}
                    </CardDescription>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    {item.date && (
                      <div className="flex items-center space-x-1">
                        <CalendarIcon size={16} />
                        <span>{item.date}</span>
                      </div>
                    )}
                    {item.author && (
                      <div className="flex items-center space-x-1">
                        <UserIcon size={16} />
                        <span>{item.author}</span>
                      </div>
                    )}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={"secondary"} asChild>
                    <Link href={`/articles/${item.slug}`}>
                      Read More -&gt;{" "}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridSection;
