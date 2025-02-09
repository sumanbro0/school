"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

import CategoryFormModal from "./category-modal";
import BlogFormModal from "./blog-form-modal";
import { SelectFeeStructureWithFees } from "@/types/contents/home";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import FeeFormModal from "./add-fee-modal";
import { useGetFees } from "../api/use-fee";

const FeesCms = () => {
  const [open, setOpen] = React.useState(false);
  const { data } = useGetFees();
  const [initialData, setInitialData] =
    React.useState<null | SelectFeeStructureWithFees>(null);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex items-center w-full justify-between">
          <h1 className="text-xl font-semibold">Fee Structures</h1>
          <div className="flex items-center gap-2">
            <Button size={"sm"} onClick={() => setOpen(true)}>
              <Plus size={24} />
              Fee Structure
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
        {data?.data.map((d) => (
          <Card key={d?.feeStructure?.id}>
            <CardContent className="flex items-center justify-between w-full p-4">
              <div className="flex flex-col ">
                <CardTitle>{d?.feeStructure?.grade}</CardTitle>
              </div>
              <Button
                onClick={() => {
                  setInitialData({
                    id: d?.feeStructure?.id,
                    grade: d?.feeStructure?.grade,
                    description: d?.feeStructure?.description,
                    image: d?.feeStructure?.image,
                    fees: d.fees ? d.fees : [],
                  });
                  setOpen(true);
                }}
                variant={"ghost"}
                size={"icon"}
              >
                <Edit size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <FeeFormModal
        open={open}
        onOpenChange={setOpen}
        initialData={initialData}
      />
    </>
  );
};

export default FeesCms;
