import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AdmissionForm from "./admission-form";

const AdmissionFormModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionFormModal;
