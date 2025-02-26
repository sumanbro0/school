"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  X,
  ImagePlus,
  FileText,
  File,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

interface UploadWidgetProps {
  onUploadSuccess?: (url: string) => void;
  value?: string;
  className?: string;
  variant?: "image" | "file" | "document";
  folderName?: string;
  label?: string;
  inline?: boolean;
  accept?: string;
  helpText?: string;
}

export function UploadWidget({
  onUploadSuccess,
  value,
  className,
  variant = "image",
  folderName,
  label,
  inline = false,
  accept = "image/*",
  helpText,
}: UploadWidgetProps) {
  const [file, setFile] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFile(value || null);
  }, [value]);

  // Simulate progress for demo purposes
  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    } else if (uploadProgress === 90) {
      setUploadProgress(100);
    } else if (!uploading && uploadProgress !== 100) {
      setUploadProgress(0);
    }
  }, [uploading, uploadProgress]);

  const uploadFile = async (fileToUpload: File) => {
    const fileSize = fileToUpload.size / (1024 * 1024); // Convert to MB

    if (fileSize > 5) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    if (variant === "image" && !fileToUpload.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (
      variant === "document" &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ].includes(fileToUpload.type)
    ) {
      toast.error("Please select a valid document file");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("type", variant); // Send file type to the backend
      if (folderName) {
        formData.append("folder", folderName);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFile(data.secure_url);
      onUploadSuccess?.(data.secure_url);
      toast.success("Upload successful");
      setUploadProgress(100);
    } catch {
      toast.error("Upload failed");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) uploadFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) uploadFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onUploadSuccess?.("");
    if (inputRef.current) inputRef.current.value = "";
    setUploadProgress(0);
  };

  // Inline progress bar UI
  if (inline) {
    return (
      <div className={cn("w-full", className)}>
        <div className="flex items-center gap-2 mb-1">
          {label && <span className="text-sm font-medium">{label}</span>}
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="flex-1 rounded-2xl text-gray-800 text-base"
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <UploadCloud /> {file ? "Change file" : "Select file"}
          </Button>

          {file && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {(uploading || file) && (
          <div className="mt-2">
            <Progress value={uploadProgress} color="#235CDF" className="h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                {uploading ? "Uploading..." : file ? "Uploaded" : ""}
              </span>
              {file && !uploading && (
                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {file.split("/").pop()}
                </span>
              )}
            </div>
          </div>
        )}

        {helpText && !uploading && !file && (
          <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
        )}
      </div>
    );
  }

  // Standard upload UI
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="relative w-full aspect-video rounded-2xl border-2 border-dashed
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
              {variant === "image" ? (
                <ImagePlus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : variant === "document" ? (
                <FileText className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <File className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  Drop your {variant} here, or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {variant === "image"
                    ? "PNG, JPG or GIF (max. 5MB)"
                    : variant === "document"
                    ? "PDF, DOC, DOCX, XLS, XLSX or TXT (max. 5MB)"
                    : "Max. 5MB"}
                </p>
                {helpText && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {helpText}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
          {variant === "image" ? (
            <Image
              src={file}
              alt="Uploaded image"
              className="object-cover"
              quality={90}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              {variant === "document" ? (
                <FileText className="h-16 w-16 text-muted-foreground" />
              ) : (
                <File className="h-16 w-16 text-muted-foreground" />
              )}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm font-medium truncate px-4">
                  {file.split("/").pop()}
                </p>
              </div>
            </div>
          )}

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
                    handleRemoveFile();
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
        <div className="mt-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center mt-1">
            Uploading...
          </p>
        </div>
      )}
    </div>
  );
}
