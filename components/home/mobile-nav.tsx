"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useFormModalStore } from "@/hooks/use-form-modal-store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ParentEnumValuesType } from "@/db/schemas/pages";

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
  const isSelect =
    item.href.split("/").includes(pathName[0]) ||
    (pathName.join() === "" && item.href === "/");

  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center justify-between gap-1 font-medium w-full py-3 px-4 hover:bg-[#1c2164] rounded-md transition-colors",
            isSelect && "bg-[#1c2164] text-blue-300"
          )}
        >
          <span>{item.label}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-[#141744] border-[#1c2164] w-[calc(100vw-32px)] sm:w-[368px] p-0"
          align="start"
          sideOffset={0}
        >
          <ScrollArea className="h-[300px] w-full">
            <div className="p-2 space-y-1">
              {item.children.map((child) => (
                <DropdownMenuItem
                  key={child.pageSlug}
                  className="hover:bg-[#1c2164] focus:bg-[#1c2164] text-gray-100 rounded-md px-4 py-2"
                >
                  <Link
                    href={`${generatePath(
                      item.href as ParentEnumValuesType,
                      child.pageSlug
                    )}`}
                    className="w-full block hover:text-white"
                    onClick={() => setIsOpen?.(false)}
                  >
                    {child.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              {item.action && setIsOpen && (
                <DropdownMenuItem
                  onClick={() => {
                    item.action?.();
                    setIsOpen(false);
                  }}
                  className="hover:bg-[#1c2164] focus:bg-[#1c2164] text-gray-100 rounded-md px-4 py-2"
                >
                  <Link href="#" scroll={false} className="w-full block">
                    Admission Form
                  </Link>
                </DropdownMenuItem>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "block py-3 px-4 font-medium transition-colors hover:bg-[#1c2164] rounded-md",
        isSelect && "bg-[#1c2164] text-white"
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

const MobileNavBar = ({ pages }: MobileNavBarProps) => {
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
        { title: "activities", pageSlug: "activities" },
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
        <SheetTrigger className="block md:hidden p-4" asChild>
          <button>
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-[#141744] text-gray-50 p-4"
        >
          <ScrollArea className="h-[calc(100vh-80px)] w-full pr-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
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
