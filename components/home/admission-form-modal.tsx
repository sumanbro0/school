"use client";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AdmissionForm from "./admission-form";
import { useFormModalStore } from "@/hooks/use-form-modal-store";

const AdmissionFormModal = () => {
  const { isOpen, setIsOpen } = useFormModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-white text-primary hover:bg-gray-100"
          variant="default"
        >
          Enquire Now →
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-semibold text-center text-xl">
          Enquiry Form
        </DialogTitle>

        <AdmissionForm
          onSuccess={() => {
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionFormModal;
