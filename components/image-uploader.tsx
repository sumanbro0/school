"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "./ui/input";

interface UploadWidgetProps {
  onUploadSuccess?: (url: string) => void;
  value?: string;
  className?: string;
}

export function UploadWidget({
  onUploadSuccess,
  value,
  className,
}: UploadWidgetProps) {
  const [image, setImage] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(value || null);
  }, [value]);

  const uploadImage = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setImage(data.secure_url);
      onUploadSuccess?.(data.secure_url);
      toast.success("Upload successful");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    onUploadSuccess?.("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!image ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="relative w-full aspect-video  rounded-2xl border-2 border-dashed
            transition-colors duration-200 cursor-pointer
            flex flex-col items-center justify-center gap-2
            bg-muted/50 hover:bg-muted/70 group"
        >
          {uploading ? (
            <div className="flex z-50 flex-col items-center gap-2">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm font-medium">Uploading...</p>
            </div>
          ) : (
            <>
              <ImagePlus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  Drop your image here, or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG or GIF (max. 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
          <Image
            src={image}
            alt="Uploaded image"
            className="object-cover"
            quality={90}
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center   
          justify-center gap-2"
          >
            {uploading ? (
              <div className="flex z-50 flex-col items-center gap-2">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm font-medium">Uploading...</p>
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Change
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      {uploading && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Uploading...
        </p>
      )}
    </div>
  );
}
