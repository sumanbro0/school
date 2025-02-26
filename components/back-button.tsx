"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// type Props = {}

const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={router.back} variant={"ghost"}>
      <ChevronLeft size={16} className="mr-1" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
