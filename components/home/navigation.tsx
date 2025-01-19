import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";

import NavBar from "./nav-bar";
import { getSchool } from "@/actions/get-school";
import Image from "next/image";

export async function Navigation() {
  const school = await getSchool();

  if (!school) {
    console.log("No school found");
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#B01B2E] text-white">
        <div className="container mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src={school?.logo || "https://via.placeholder.com/150"}
              alt={school?.logoLabel || "School Logo"}
              width={40}
              height={40}
              className="aspect-square rounded-xl"
            />
            <span className="text-2xl font-semibold capitalize">
              {school?.name}
            </span>
          </Link>
          <div className="flex items-center gap-4">
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
            <Button className="bg-black hover:bg-gray-800">Contact Us</Button>
          </div>
        </div>
        <NavBar logoLabel={school?.logoLabel || ""} />
      </div>
    </header>
  );
}
