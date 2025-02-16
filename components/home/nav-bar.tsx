"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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

type NavLinkProps = {
  item: NavItem;
  pathName: string[];
  parent: ParentEnumValuesType;
  setIsOpen?: (isOpen: boolean) => void;
};

const generatePath = (parent: ParentEnumValuesType, pageSlug: string) => {
  if (pageSlug === "activities") return `/${pageSlug}`;

  return `/${parent}/${pageSlug}`;
};

const NavLink = ({ item, pathName, setIsOpen, parent }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelect =
    item.href.split("/").includes(pathName[0]) ||
    (pathName.join() === "" && item.href === "/");

  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu open={isHovered} onOpenChange={setIsHovered}>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-1 font-medium transition-colors hover:text-blue-300 px-1 pl-2 rounded-md text-sm",
            isSelect && "bg-primary-foreground text-primary"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.label} <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-primary text-primary-foreground"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.children.map((child) => (
            <DropdownMenuItem
              className="hover:bg-accent hover:text-primary"
              key={child.pageSlug}
            >
              <Link
                href={`${generatePath(parent, child.pageSlug)}`}
                className="w-full hover:bg-accent"
              >
                {child.title}
              </Link>
            </DropdownMenuItem>
          ))}
          {item.action && setIsOpen && (
            <DropdownMenuItem
              className="font-medium transition-colors hover:text-blue-300 py-2 px-3 rounded-md text-sm hover:bg-[#1c2164]"
              onClick={() => item.action?.()}
            >
              <Link href="#" scroll={false} className="w-full">
                Admission Form
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "font-medium transition-colors hover:text-blue-300 py-2 px-3 rounded-md text-sm",
        isSelect && "bg-[#1c2164] text-blue-300"
      )}
    >
      {item.label}
    </Link>
  );
};

type NavBarProps = {
  pages:
    | {
        title: string;
        pageSlug: string;
        parent: ParentEnumValuesType;
      }[]
    | null;
};

const NavBar = ({ pages }: NavBarProps) => {
  const { setIsOpen } = useFormModalStore();
  const pathName = usePathname()
    .split("/")
    .filter((p) => !!p);

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "#",
      label: "About Us",
      parentType: "about",
      children: [
        {
          pageSlug: "",
          title: "our story",
        },
        ...(pages
          ?.filter((page) => page.parent === "about")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
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
      children: [
        {
          title: "Academic Excellence",
          pageSlug: "",
        },
        ...(pages
          ?.filter((page) => page.parent === "academics")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
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
      href: "/alumni",
      label: "Alumni",
      parentType: "alumni",
      children: pages
        ?.filter((page) => page.parent === "alumni")
        .map(({ title, pageSlug }) => ({ title, pageSlug })),
    },
    {
      href: "/carrer",
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
    <nav className="bg-[#141744] text-gray-50 w-full hidden md:block sticky top-0 z-50">
      <div className="flex items-center justify-between py-1 px-6 max-w-7xl mx-auto overflow-x-auto">
        {navItems.map((item, index) => (
          <NavLink
            parent={item.parentType || "about"}
            key={index}
            item={item}
            pathName={pathName}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
