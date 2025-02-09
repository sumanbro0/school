import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "./category-form";

export default function CategoryFormModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2">
        <DialogHeader className="pl-6">
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
