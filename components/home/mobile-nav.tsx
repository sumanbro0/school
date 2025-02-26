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
import { getNavItems } from "./routes";

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
            "flex items-center justify-between gap-1 font-medium w-full py-3 px-4 hover:bg-gray-100 rounded-md transition-all duration-200",
            isSelect && "bg-gray-100 text-blue-600",
            isDropdownOpen && "bg-gray-100 rounded-b-none"
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
              className="bg-white border-l-2 border-blue-400 overflow-hidden rounded-b-md mb-1"
            >
              <div className="p-2 space-y-1">
                {item.children.map((child) => (
                  <div
                    key={child.pageSlug}
                    className="hover:bg-gray-100 text-gray-700 rounded-md transition-colors"
                  >
                    <Link
                      href={generatePath(
                        item.parentType as ParentEnumValuesType,
                        child.pageSlug
                      )}
                      className="w-full block hover:text-blue-600 px-4 py-2 transition-colors"
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
                    className="hover:bg-gray-100 text-gray-700 rounded-md transition-colors"
                  >
                    <Link
                      href="#"
                      scroll={false}
                      className="w-full block px-4 py-2 font-medium text-blue-600"
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
        "block py-3 px-4 font-medium transition-all duration-200 hover:bg-gray-100 rounded-md hover:pl-6",
        isSelect && "bg-gray-100 text-blue-600 border-l-2 border-blue-400 pl-6"
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
  const handleOpen = () => {
    setIsOpen(true);
  };
  const navItems = getNavItems({ pages, setIsOpen: handleOpen });
  return (
    <nav className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors md:hidden"
          asChild
        >
          <button aria-label="Open navigation menu">
            <Menu size={20} className="text-gray-800" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-white text-gray-800 p-0 border-l border-gray-200"
        >
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-xl text-gray-800">{logoLabel}</h2>
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
