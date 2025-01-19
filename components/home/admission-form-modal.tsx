"use client";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogContent } from "../ui/dialog";
import AdmissionForm from "./admission-form";
import { useFormModalStore } from "@/hooks/use-form-modal-store";

const AdmissionFormModal = () => {
  const { isOpen, setIsOpen } = useFormModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
