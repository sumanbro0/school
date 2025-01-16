import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";

import { school as scl } from "@/db/schemas/school";
import { db } from "@/db";
import NavBar from "./nav-bar";

export async function Navigation() {
  const [school] = await db.select().from(scl).limit(1);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#B01B2E] text-white py-2">
        <div className="container mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <Link
              href={`tel:${school?.phone}`}
              className="flex items-center gap-2 hover:text-gray-200"
            >
              <Phone className="h-4 w-4" />
              <span>{school?.phone}</span>
            </Link>
            <Link
              href={`mailto:${school?.email}`}
              className="flex items-center gap-2 hover:text-gray-200"
            >
              <Mail className="h-4 w-4" />
              <span>{school?.email}</span>
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
      <NavBar logoLabel={school?.logoLabel} />
    </header>
  );
}
