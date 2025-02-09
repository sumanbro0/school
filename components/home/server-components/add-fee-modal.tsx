import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogsForm from "./blog-form";
import { BlogType, SelectFeeStructureWithFees } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contentTypeEnum } from "@/db/schemas/blogs";
import FeeStructureForm from "./add-fee-form";

export default function FeeFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData: SelectFeeStructureWithFees | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2 max-w-3xl w-full">
        <DialogHeader className="pl-6">
          <DialogTitle>{!initialData && "New"} Fee Structure</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-3">
          <FeeStructureForm
            onSuccess={() => onOpenChange(false)}
            initialData={initialData}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
