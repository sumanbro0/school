import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import HighlightForm from "./highlight-form";
import { HighlightType } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HighlightFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData: HighlightType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2">
        <DialogHeader className="pl-6">
          <DialogTitle>Highlight Form</DialogTitle>
          <DialogDescription>Enter your details below</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-3">
          <HighlightForm
            initialData={initialData}
            onSuccess={() => onOpenChange(false)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
