// components/TestimonialFormModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import TestimonialForm from "./testimonial-form";
import { TestimonialType } from "@/db/schemas/testimonials";

export default function TestimonialFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData: TestimonialType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2">
        <DialogHeader className="pl-6">
          <DialogTitle>Testimonial</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] px-3">
          <TestimonialForm
            initialData={initialData}
            onSuccess={() => onOpenChange(false)}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
