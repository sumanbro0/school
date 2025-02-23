// navigation-content.tsx
"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import NavBar from "./nav-bar";
import Image from "next/image";
import TriggerFormModal from "./trigger-form-modal";
import MobileNavBar from "./mobile-nav";
import TopTicker from "../top-ticker";
import { useEffect, useState } from "react";
import { School } from "@/types/school";
import { Pages } from "@/types/contents/home";

interface NavigationContentProps {
  school: School | null;
  pages: Pages;
}

export function NavigationContent({ school, pages }: NavigationContentProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed w-full top-0 left-0 right-0 z-50 bg-background
        transition-all duration-300 ease-in-out
        ${scrolled ? "shadow-md" : ""}
      `}
    >
      <div
        className={`
        transition-all duration-300
        ${scrolled ? "h-0 overflow-hidden" : "h-auto"}
      `}
      >
        <TopTicker />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div
          className={`
          flex items-center justify-between
          transition-all duration-300
          ${scrolled ? "py-2" : "py-4"}
        `}
        >
          <NavigationLogo school={school} isScrolled={scrolled} />
          <NavigationActions
            school={school}
            pages={pages}
            isScrolled={scrolled}
          />
        </div>
      </div>

      <div
        className={`
        hidden sm:block border-t
        transition-all duration-300
      `}
      >
        <NavBar pages={pages} />
      </div>
    </header>
  );
}

// navigation-logo.tsx
interface NavigationLogoProps {
  school: School | null;
  isScrolled: boolean;
}

function NavigationLogo({ school, isScrolled }: NavigationLogoProps) {
  return (
    <Link href="/" className="flex-shrink-0">
      <div
        className={`
        relative transition-all duration-300
        ${
          isScrolled ? "w-40 h-10 sm:w-48 sm:h-12" : "w-48 h-12 sm:w-64 sm:h-16"
        }
      `}
      >
        <Image
          src={school?.logo || "https://via.placeholder.com/150"}
          alt={school?.logoLabel || "School Logo"}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </Link>
  );
}

// navigation-actions.tsx
interface NavigationActionsProps {
  school: School | null;
  pages: Pages;
  isScrolled: boolean;
}

function NavigationActions({
  school,
  pages,
  isScrolled,
}: NavigationActionsProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="hidden sm:flex items-center space-x-4">
        <Link
          href={`tel:${school?.phone}`}
          className={`
            flex items-center gap-2 hover:text-gray-800
            transition-all duration-300
            ${isScrolled ? "text-xs" : "text-sm"}
          `}
        >
          <Phone
            className={`
            transition-all duration-300
            ${isScrolled ? "h-3 w-3" : "h-4 w-4"}
          `}
          />
          <span className="hidden md:inline">{school?.phone}</span>
        </Link>
        <Link
          href={`mailto:${school?.email}`}
          className={`
            flex items-center gap-2 hover:text-gray-800
            transition-all duration-300
            ${isScrolled ? "text-xs" : "text-sm"}
          `}
        >
          <Mail
            className={`
            transition-all duration-300
            ${isScrolled ? "h-3 w-3" : "h-4 w-4"}
          `}
          />
          <span className="hidden md:inline">{school?.email}</span>
        </Link>
      </div>
      <TriggerFormModal
        className={`
          bg-primary hover:bg-primary/90 text-primary-foreground rounded-md
          transition-all duration-300
          ${isScrolled ? "text-xs px-2 py-1.5" : "text-sm px-3 py-2"}
        `}
        triggerText="Enroll Now"
      />
      <MobileNavBar logoLabel={school?.logoLabel || ""} pages={pages} />
    </div>
  );
}
