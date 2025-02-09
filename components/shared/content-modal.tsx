// components/ContentModal.tsx
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import VideoPlayer from "./vid-player";

type ContentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mediaType?: "image" | "video";
  mediaUrl?: string;
  className?: string;
  dialogContentProps?: React.ComponentProps<typeof DialogContent>;
  dialogHeaderProps?: React.ComponentProps<typeof DialogHeader>;
  dialogTitleProps?: React.ComponentProps<typeof DialogTitle>;
};

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  title,
  mediaType,
  mediaUrl,
  className,
  dialogContentProps,
  dialogHeaderProps,
  dialogTitleProps,
}) => {
  const renderMedia = () => {
    if (!mediaUrl) return null;

    if (mediaType === "video") {
      return (
        <div className="w-full h-full">
          <VideoPlayer url={mediaUrl} className="w-full h-full rounded-lg" />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full relative">
          <Image
            src={mediaUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        {...dialogContentProps}
        className={cn(
          "max-w-4xl w-[90vw] h-[90vh] flex flex-col p-0 overflow-hidden",
          dialogContentProps?.className,
          className
        )}
      >
        <DialogHeader
          {...dialogHeaderProps}
          className={cn("p-4 pb-0", dialogHeaderProps?.className)}
        >
          <DialogTitle
            {...dialogTitleProps}
            className={cn("text-2xl font-bold", dialogTitleProps?.className)}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow flex flex-col md:flex-row p-4 pt-0 gap-4">
          <div className="w-full  md:h-full">{renderMedia()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
