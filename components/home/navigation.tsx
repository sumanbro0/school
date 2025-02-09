import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import NavBar from "./nav-bar";
import { getSchool } from "@/actions/get-school";
import Image from "next/image";
import TriggerFormModal from "./trigger-form-modal";
import MobileNavBar from "./mobile-nav";

export async function Navigation() {
  const school = await getSchool();

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 shadow-lg bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-48 h-12 sm:w-64 sm:h-16">
              <Image
                src={school?.logo || "https://via.placeholder.com/150"}
                alt={school?.logoLabel || "School Logo"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href={`tel:${school?.phone}`}
                className="flex items-center gap-2 hover:text-gray-800 text-sm"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden md:inline">{school?.phone}</span>
              </Link>
              <Link
                href={`mailto:${school?.email}`}
                className="flex items-center gap-2 hover:text-gray-800 text-sm"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">{school?.email}</span>
              </Link>
            </div>
            <TriggerFormModal
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-3 py-2 rounded-md transition-colors"
              triggerText="Enroll Now"
            />
            <MobileNavBar logoLabel={school?.logoLabel || ""} />
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <NavBar logoLabel={school?.logoLabel || ""} />
      </div>
    </header>
  );
}
