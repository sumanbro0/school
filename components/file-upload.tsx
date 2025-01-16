import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  previewUrl: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

export default function FileUpload({
  previewUrl,
  onFileChange,
  onRemove,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const event = {
        target: {
          files: e.dataTransfer.files,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">School Logo</label>

        <div
          className={`
            relative group cursor-pointer
            border-2 ${
              isDragging ? "border-blue-500" : "border-dashed border-gray-300"
            }
            rounded-lg transition-all duration-200 h-[200px] aspect-video
            hover:border-gray-400
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {previewUrl ? (
            // Image Preview
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt="Logo preview"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 448px) 100vw, 448px"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="text-white text-center">
                  <ImageIcon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Click to change image</span>
                </div>
              </div>
            </div>
          ) : (
            // Upload placeholder
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-gray-500">
              <div className="p-4 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-sm text-center space-y-1">
                <p className="font-medium">Click to upload</p>
                <p className="text-xs text-gray-400">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
