"use client";
import React, { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useFormModalStore } from "@/hooks/use-form-modal-store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ParentEnumValuesType } from "@/db/schemas/pages";
import { getNavItems, NavItem } from "./routes";

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
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1 font-medium transition-all duration-200 hover:text-blue-300 px-3 py-2 rounded-md text-sm relative group cursor-pointer",
              isSelect && "text-blue-300",
              isSticky ? "py-1" : "py-2"
            )}
          >
            {item.label}
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />

            {/* Animated underline effect */}
            <span
              className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full",
                isSelect && "w-full"
              )}
            ></span>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="bg-[#181b4d] border border-[#2a2f6e] rounded-md shadow-lg p-1 w-auto min-w-[200px]"
          align="center"
          sideOffset={5}
        >
          <div className="flex flex-col">
            {item.children.map((child) => (
              <Link
                href={generatePath(parent, child.pageSlug)}
                className="hover:bg-accent/10 text-gray-100 px-4 py-2 hover:text-blue-200 transition-colors w-full rounded-md text-sm"
                key={child.pageSlug}
              >
                {child.title}
              </Link>
            ))}
            {item.action && setIsOpen && (
              <Link
                href="#"
                scroll={false}
                className="hover:bg-accent/10 text-gray-100 px-4 py-2 hover:text-blue-200 transition-colors w-full rounded-md text-sm"
                onClick={() => {
                  item.action?.();
                }}
              >
                Enquiry Form
              </Link>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
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
  const handleOpen = () => {
    setIsOpen(true);
  };
  const navItems = getNavItems({ pages, setIsOpen: handleOpen });

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
