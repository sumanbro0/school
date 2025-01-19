"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFormModalStore } from "@/hooks/use-form-modal-store";

interface Props {
  triggerText?: string;
  className?: string;
}

const TriggerFormModal = ({
  triggerText = "Enquire Now ->",
  className,
}: Props) => {
  const { setIsOpen } = useFormModalStore();
  return (
    <Button
      onClick={() => setIsOpen(true)}
      className={cn("bg-white text-primary hover:bg-gray-100", className)}
    >
      {triggerText}
    </Button>
  );
};

export default TriggerFormModal;
