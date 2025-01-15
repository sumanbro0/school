"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { useBreadcrumbStore } from "@/hooks/use-breadcrumb-store";
import { UserButton } from "@clerk/nextjs";

const PageHeader = () => {
  const { breadcrumbs } = useBreadcrumbStore();
  return (
    <header className="flex h-16 shrink-0 items-center  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className=" flex px-6 justify-between  items-center flex-1">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={breadcrumb.href || "#"}>
                      {breadcrumb.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block md:last:hidden" />
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-8 w-8 shadow-md", // Customize avatar size
              userButtonPopoverCard: "shadow-lg border border-gray-200", // Customize popup card
              userButtonPopoverActionButton:
                "hover:bg-gray-100 text-gray-700 hover:text-gray-900", // Customize action buttons
              userButtonPopoverActionButtonText: "font-medium", // Customize button text
              userButtonPopoverFooter: "hidden", // Hide footer (removes branding)
              userPreviewMainIdentifier: "font-semibold", // Username/email style
              userPreviewSecondaryIdentifier: "text-gray-500", // Secondary text style
            },
          }}
        />{" "}
      </div>
    </header>
  );
};

export default PageHeader;
