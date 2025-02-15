"use client";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type LightboxProps = {
  image: {
    imageUrl: string;
    title: string;
    subTitle?: string;
  };
};

const LightboxComponent = ({ image }: LightboxProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer relative w-[300px] h-[200px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
          <Image
            src={image.imageUrl}
            alt={image.title}
            fill
            className="object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{image.title}</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={() => {}}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <Image
            src={image.imageUrl}
            alt={image.title}
            fill
            className="object-contain"
            quality={100}
          />
        </div>
        {image.subTitle && (
          <p className="text-sm text-muted-foreground">{image.subTitle}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LightboxComponent;
