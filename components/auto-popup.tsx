"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useGetPopup } from "./home/api/use-popup";

export function AutoPopup() {
  const [open, setOpen] = useState(false);
  const { data: popupData } = useGetPopup();
  const popup = popupData?.data;

  useEffect(() => {
    // Check if popup is active and hasn't been shown in this session
    if (popup?.isActive && !sessionStorage.getItem("popupShown")) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("popupShown", "true");
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (!popup || !popup.isActive) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative">
          {popup.image && (
            <div className="relative w-full h-[200px] sm:h-[300px]">
              <Image
                src={popup.image}
                alt={popup.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{popup.title}</h2>
            {popup.subTitle && (
              <p className="text-lg text-muted-foreground mb-2">
                {popup.subTitle}
              </p>
            )}
            <p className="text-base mb-4">{popup.descreption}</p>
            {popup.buttonText && popup.href && (
              <div className="flex justify-center">
                <Button
                  asChild
                  className="w-full sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  <Link href={popup.href}>{popup.buttonText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
