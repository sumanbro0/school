import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HighlightType, ImageGalleryType } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageGalleryForm from "./image-gallery-form";

export default function ImageFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData: ImageGalleryType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2">
        <DialogHeader className="pl-6">
          <DialogTitle>Image Gallery</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] px-3">
          <ImageGalleryForm
            initialData={initialData}
            onSuccess={() => onOpenChange(false)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
