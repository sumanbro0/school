import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageType } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";
import PagesForm from "./pages-form";

export default function PageFormModal({
  open,
  onOpenChange,
  initialData,
}: {
  initialData: PageType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  console.log(initialData);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2 max-w-6xl w-full">
        <DialogHeader className="pl-6">
          <DialogTitle>New Page</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-3">
          <PagesForm
            onSuccess={() => onOpenChange(false)}
            initialData={initialData}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
