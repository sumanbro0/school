"use client";

import Link from "next/link";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { client } from "@/lib/hono";

export async function Navigation() {
  const res = await client.api.school.$get();
  const { scl: school } = await res.json();

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#B01B2E] text-white py-2">
        <div className="container mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <Link
              href={`tel:${school.phone}`}
              className="flex items-center gap-2 hover:text-gray-200"
            >
              <Phone className="h-4 w-4" />
              <span>{school.phone}</span>
            </Link>
            <Link
              href={`mailto:${school.email}`}
              className="flex items-center gap-2 hover:text-gray-200"
            >
              <Mail className="h-4 w-4" />
              <span>{school.email}</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-white text-[#B01B2E] hover:bg-gray-100"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#B01B2E]">
                {school.logoLabel}
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#B01B2E] font-medium transition-colors">
                  Admission <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scroll();
                    }}
                  >
                    <Link href="#" className="w-full">
                      Admission Form
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admission/fee-structure" className="w-full">
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

            <Button className="bg-[#B01B2E] text-white hover:bg-[#8B1624]">
              Admissions 2025-26
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
