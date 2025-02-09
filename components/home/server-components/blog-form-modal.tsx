import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BlogsForm from "./blog-form";
import { BlogType } from "@/types/contents/home";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contentTypeEnum } from "@/db/schemas/blogs";

export default function BlogFormModal({
  open,
  onOpenChange,
  initialData,
  postType,
}: {
  initialData: BlogType | null;
  postType: BlogType["contentTypeEnum"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-2 max-w-3xl w-full">
        <DialogHeader className="pl-6">
          <DialogTitle>New Blog</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-3">
          <BlogsForm
            postType={postType}
            onSuccess={() => onOpenChange(false)}
            initialData={initialData}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
