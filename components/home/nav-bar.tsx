"use client";
import React, { useState, useEffect } from "react";
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
  if (["activities", "register"].includes(pageSlug)) return `/${pageSlug}`;
  if (pageSlug === "") return `/${parent}`;
  return `/${parent}/${pageSlug}`;
};

const NavLink = ({ item, pathName, setIsOpen, parent }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const isSelect =
    item.href.split("/").includes(pathName[0]) ||
    (pathName.join() === "" && item.href === "/");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu open={isHovered} onOpenChange={setIsHovered}>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-1 font-medium transition-all duration-200 hover:text-blue-300 px-3 py-2 rounded-md text-sm relative group",
            isSelect && "text-blue-300",
            isSticky ? "py-1" : "py-2"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isHovered && "rotate-180"
            )}
          />

          {/* Animated underline effect */}
          <span
            className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full",
              isSelect && "w-full"
            )}
          ></span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-[#181b4d] border border-[#2a2f6e] rounded-md shadow-lg py-1 mt-1 min-w-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          align="center"
          sideOffset={5}
        >
          {item.children.map((child) => (
            <DropdownMenuItem
              className="hover:bg-[#1c2164] focus:bg-[#1c2164] text-gray-100 px-4 py-2"
              key={child.pageSlug}
            >
              <Link
                href={generatePath(parent, child.pageSlug)}
                className="w-full block hover:text-blue-300 transition-colors"
                onClick={() => setIsHovered(false)}
              >
                {child.title}
              </Link>
            </DropdownMenuItem>
          ))}
          {item.action && setIsOpen && (
            <DropdownMenuItem
              className="hover:bg-[#1c2164] focus:bg-[#1c2164] text-blue-300 font-medium px-4 py-2 border-t border-[#2a2f6e] mt-1"
              onClick={() => {
                item.action?.();
                setIsHovered(false);
              }}
            >
              <Link
                href="#"
                scroll={false}
                className="w-full block text-primary-foreground"
              >
                Enquiry Form
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
        "font-medium transition-all duration-200 hover:text-blue-300 px-3 rounded-md text-sm relative group",
        isSelect && "text-blue-300",
        isSticky ? "py-1" : "py-2"
      )}
    >
      {item.label}
      {/* Animated underline effect */}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full",
          isSelect && "w-full"
        )}
      ></span>
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
  const [isSticky, setIsSticky] = useState(false);
  const pathName = usePathname()
    .split("/")
    .filter((p) => !!p);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          title: "Our Story",
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
      children: [
        {
          pageSlug: "register",
          title: "Admission Form",
        },
        ...(pages
          ?.filter((page) => page.parent === "admission")
          .map(({ title, pageSlug }) => ({ title, pageSlug })) || []),
      ],
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
        {
          title: "Fee Structure",
          pageSlug: "fee-structure",
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
    <nav
      className={cn(
        "bg-[#141744] text-gray-50 w-full hidden md:block sticky top-0 z-50 transition-all duration-300",
        isSticky && "shadow-lg"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 max-w-7xl mx-auto transition-all duration-200",
          isSticky ? "h-12" : "h-14"
        )}
      >
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
