import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AdmissionForm from "./admission-form";

const AdmissionFormModal = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionFormModal;
