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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavBar = ({}: { logoLabel: string }) => {
  const { setIsOpen } = useFormModalStore();
  const pathName=usePathname().split("/").filter(p=>!!p)
  console.log(pathName)
  return (
    <nav className=" bg-gray-50 w-full  hidden md:block px-4 ">
      <div className=" flex items-center justify-between py-2  px-4 max-w-2xl mx-auto">
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
        <NavLink pathName={pathName} href="/academics">Academics</NavLink>
        <NavLink pathName={pathName} href="/blogs">Blogs</NavLink>
        <NavLink pathName={pathName} href="/about">About Us</NavLink>
        <NavLink pathName={pathName} href="/activities">Activities</NavLink>

        {/* <DropdownMenu>
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
        </DropdownMenu> */}
      </div>
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
  pathName:string[],
}) {

  return (
    <Link
      href={href}
      className={cn("text-gray-700 hover:text-[#B01B2E] font-medium transition-colors",(pathName[pathName.length -1]==(href.split("/")[1])) && "bg-primary text-primary-foreground hover:text-primary-foreground px-2 rounded-lg" )}
    >
      {children}
    </Link>
  );
}

export default NavBar;
