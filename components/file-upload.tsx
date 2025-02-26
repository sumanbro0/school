import { Upload, X, Image as ImageIcon, File as FileIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  previewUrl: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  variant?: "image" | "file";
  folderName?: string;
  label?: string;
  inline?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  helpText?: string;
}

export default function FileUpload({
  previewUrl,
  onFileChange,
  onRemove,
  variant = "image", // Default to image
  folderName = "uploads", // Default folder name
  label = "Upload",
  inline,
  // Default to block display
  accept = variant === "image"
    ? "image/" + "*"
    : "application/pdf,application/zip,application/x-zip-compressed",
  maxSize = 5, // Default max size in MB
  helpText = variant === "image"
    ? "SVG, PNG, JPG or GIF (max. 5MB)"
    : "PDF, ZIP, DOC, DOCX (max. 5MB)",
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
    if (file) {
      // For images, check if it's an image type
      if (variant === "image" && !file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      // Create an artificial event with proper dataset structure
      const input = document.createElement("input");
      input.files = e.dataTransfer.files;
      input.dataset.folder = folderName;

      const event = {
        target: input,
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds ${maxSize}MB limit`);
        return;
      }

      // Add folder information to the event
      e.target.dataset.folder = folderName;

      onFileChange(e);
    }
  };

  // Inline style upload component
  if (inline) {
    return (
      <div className="w-full">
        <div className="flex items-center space-x-2">
          {label && (
            <label className="text-sm font-medium text-gray-700 flex-shrink-0">
              {label}
            </label>
          )}

          <div
            className={cn(
              "flex-1 flex items-center px-3 py-2 border rounded-lg cursor-pointer",
              isDragging ? "border-blue-500" : "border-gray-300",
              "hover:bg-gray-50 transition-colors"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {previewUrl ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {variant === "image" ? (
                    <div className="h-8 w-8 relative rounded overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    <FileIcon className="h-5 w-5 text-blue-500" />
                  )}
                  <span className="text-sm truncate max-w-[150px]">
                    {previewUrl.split("/").pop()}
                  </span>
                </div>
                {onRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center text-gray-500 w-full">
                <Upload className="h-4 w-4 mr-2" />
                <span className="text-sm">Drag & drop or click to upload</span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          data-folder={folderName}
        />

        {!previewUrl && helpText && (
          <p className="text-xs text-gray-400 mt-1 ml-1">{helpText}</p>
        )}
      </div>
    );
  }

  // Original block style upload component
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

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
            // Preview section (different for image vs file)
            <div className="relative w-full h-full">
              {variant === "image" ? (
                // Image preview
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 448px) 100vw, 448px"
                />
              ) : (
                // File preview (icon + filename)
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <FileIcon className="h-12 w-12 text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-gray-700 truncate max-w-[80%]">
                    {previewUrl.split("/").pop()}
                  </p>
                </div>
              )}

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
                  {variant === "image" ? (
                    <>
                      <ImageIcon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Click to change image</span>
                    </>
                  ) : (
                    <>
                      <FileIcon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Click to change file</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Upload placeholder
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-gray-500">
              <div className="p-4 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                {variant === "image" ? (
                  <ImageIcon className="h-6 w-6" />
                ) : (
                  <FileIcon className="h-6 w-6" />
                )}
              </div>
              <div className="text-sm text-center space-y-1">
                <p className="font-medium">Click to upload</p>
                <p className="text-xs text-gray-400">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">{helpText}</p>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          data-folder={folderName}
        />
      </div>
    </div>
  );
}
