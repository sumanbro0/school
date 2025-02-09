"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useFormModalStore } from "@/hooks/use-form-modal-store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNavBar = ({}: { logoLabel: string }) => {
  const { setIsOpen } = useFormModalStore();
  const pathName = usePathname()
    .split("/")
    .filter((p) => !!p);

  return (
    <nav className="md:hidden px-4">
      <Sheet>
        <SheetTrigger className="block md:hidden" asChild>
          <button>
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-[#141744] text-gray-50"
        >
          <div className="py-4">
            <NavLink pathName={pathName} href="/">
              Home
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-medium transition-colors py-2">
                Admission <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <Link href="#" scroll={false} className="w-full">
                    Admission Form
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/fee-structure" className="w-full">
                    Fee Structure
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavLink pathName={pathName} href="/academics">
              Academics
            </NavLink>
            <NavLink pathName={pathName} href="/blogs">
              Blogs
            </NavLink>
            <NavLink pathName={pathName} href="/about">
              About Us
            </NavLink>
            <NavLink pathName={pathName} href="/activities">
              Activities
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

function NavLink({
  href,
  children,
  pathName,
}: {
  href: string;
  children: React.ReactNode;
  pathName: string[];
}) {
  const isSelect =
    href.split("/").includes(pathName[0]) ||
    (pathName.join() === "" && href === "/");

  return (
    <Link
      href={href}
      className={cn(
        "block py-2 font-medium transition-colors",
        isSelect &&
          "bg-background text-primary hover:text-primary px-2 rounded-lg"
      )}
    >
      {children}
    </Link>
  );
}

export default MobileNavBar;
