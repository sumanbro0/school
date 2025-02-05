import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoGalleryType } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoGalleryForm from "./video-gallery-form";

export default function VideoFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData?: VideoGalleryType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2">
        <DialogHeader className="pl-6">
          <DialogTitle>Video Gallery</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[50vh] px-3">
          <VideoGalleryForm
            onSuccess={() => {
              onOpenChange(false);
            }}
            initialData={{
              id: initialData?.id ?? 0,
              title: initialData?.title ?? "",
              subTitle: initialData?.subTitle ?? null,
              videoUrl: initialData?.videoUrl ?? "",
            }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
