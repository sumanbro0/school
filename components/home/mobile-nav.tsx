"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useFormModalStore } from "@/hooks/use-form-modal-store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ParentEnumValuesType } from "@/db/schemas/pages";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  href: string;
  label: string;
  parentType?: ParentEnumValuesType;
  children?: {
    title: string;
    pageSlug: string;
  }[];
  action?: () => void;
};

type MobileNavLinkProps = {
  item: NavItem;
  pathName: string[];
  setIsOpen?: (isOpen: boolean) => void;
};

const generatePath = (parent: ParentEnumValuesType, pageSlug: string) => {
  if (pageSlug === "activities") return `/${pageSlug}`;
  return `/${parent}/${pageSlug}`;
};

const MobileNavLink = ({ item, pathName, setIsOpen }: MobileNavLinkProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const isSelect =
    item.href.split("/").includes(pathName[0]) ||
    (pathName.join() === "" && item.href === "/");

  if (item.children && item.children.length > 0) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            "flex items-center justify-between gap-1 font-medium w-full py-3 px-4 hover:bg-[#1c2164] rounded-md transition-all duration-200",
            isSelect && "bg-[#1c2164] text-blue-300",
            isDropdownOpen && "bg-[#1c2164] rounded-b-none"
          )}
        >
          <span>{item.label}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#181b4d] border-l-2 border-blue-400 overflow-hidden rounded-b-md mb-1"
            >
              <div className="p-2 space-y-1">
                {item.children.map((child) => (
                  <div
                    key={child.pageSlug}
                    className="hover:bg-[#1c2164] text-gray-100 rounded-md transition-colors"
                  >
                    <Link
                      href={generatePath(
                        item.parentType as ParentEnumValuesType,
                        child.pageSlug
                      )}
                      className="w-full block hover:text-white px-4 py-2 transition-colors"
                      onClick={() => setIsOpen?.(false)}
                    >
                      {child.title}
                    </Link>
                  </div>
                ))}
                {item.action && setIsOpen && (
                  <div
                    onClick={() => {
                      item.action?.();
                      setIsOpen(false);
                    }}
                    className="hover:bg-[#1c2164] text-gray-100 rounded-md transition-colors"
                  >
                    <Link
                      href="#"
                      scroll={false}
                      className="w-full block px-4 py-2 font-medium text-blue-300"
                    >
                      Admission Form
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "block py-3 px-4 font-medium transition-all duration-200 hover:bg-[#1c2164] rounded-md hover:pl-6",
        isSelect && "bg-[#1c2164] text-white border-l-2 border-blue-400 pl-6"
      )}
      onClick={() => setIsOpen?.(false)}
    >
      {item.label}
    </Link>
  );
};

type MobileNavBarProps = {
  pages:
    | {
        title: string;
        pageSlug: string;
        parent: ParentEnumValuesType;
      }[]
    | null;
  logoLabel: string;
};

const MobileNavBar = ({ pages, logoLabel }: MobileNavBarProps) => {
  const { setIsOpen } = useFormModalStore();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathName = usePathname()
    .split("/")
    ?.filter((p) => !!p);

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "#",
      label: "About Us",
      parentType: "about",
      children: pages
        ?.filter((page) => page.parent === "about")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Admission",
      parentType: "admission",
      action: () => setIsOpen(true),
      children: pages
        ?.filter((page) => page.parent === "admission")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "/ac",
      label: "Academics",
      parentType: "academics",
      children: pages
        ?.filter((page) => page.parent === "academics")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Members",
      parentType: "members",
      children: pages
        ?.filter((page) => page.parent === "members")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Facilities",
      parentType: "facilities",
      children: pages
        ?.filter((page) => page.parent === "facilities")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Co-Curricular",
      parentType: "co-curricular",
      children: [
        { title: "Activities", pageSlug: "activities" },
        ...(pages
          ?.filter((page) => page.parent === "co-curricular")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
    },
    {
      href: "#",
      label: "Gallery",
      parentType: "gallery",
      children: [
        {
          title: "Photo",
          pageSlug: "photo",
        },
        {
          title: "Video",
          pageSlug: "video",
        },
      ],
    },
    {
      href: "#",
      label: "Alumni",
      parentType: "alumni",
      children: pages
        ?.filter((page) => page.parent === "alumni")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "#",
      label: "Career",
    },
    {
      href: "/news",
      label: "News",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
    <nav className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          className="flex items-center justify-center w-10 h-10 rounded-full  transition-colors md:hidden"
          asChild
        >
          <button aria-label="Open navigation menu">
            <Menu size={20} className="text-gray-800" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[#141744] text-gray-50 p-0 border-l border-[#2a2f6e]"
        >
          <div className="p-4 bg-[#0d1030] border-b border-[#2a2f6e] flex items-center justify-between">
            <h2 className="font-bold text-xl text-white">{logoLabel}</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-80px)] w-full">
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.label}
                  item={item}
                  pathName={pathName}
                  setIsOpen={setIsSheetOpen}
                />
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavBar;
