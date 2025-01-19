"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useFormModalStore } from "@/hooks/use-form-modal-store";

const NavBar = ({}: { logoLabel: string }) => {
  const { setIsOpen } = useFormModalStore();
  return (
    <nav className=" bg-gray-50 w-full hidden md:block ">
      <div className=" flex items-center justify-between py-2  px-4 container max-w-7xl mx-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#B01B2E] font-medium transition-colors">
            Admission <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Link href="#" scroll={false} className="w-full">
                Admission Form{" "}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/fee-structure" className="w-full">
                Fee Structure
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavLink href="/academics">Academics</NavLink>
        <NavLink href="/blogs">Blogs</NavLink>
        <NavLink href="/about">About Us</NavLink>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#B01B2E] font-medium transition-colors">
            Activities <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/activities/sports" className="w-full">
                Sports
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/activities/arts" className="w-full">
                Arts & Culture
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/activities/clubs" className="w-full">
                Student Clubs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/activities/events" className="w-full">
                School Events
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-[#B01B2E] font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

export default NavBar;
