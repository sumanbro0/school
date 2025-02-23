"use client";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetSchool } from "@/server/school";

interface QuickLink {
  name: string;
  href: string;
}

export default function Footer() {
  const { data } = useGetSchool();
  const school = data?.scl;

  const quickLinks: QuickLink[] = [
    { name: "Home", href: "/" },
    { name: "Admission", href: "/fee-structure" },
    { name: "Academics", href: "/academics" },
    { name: "Activities", href: "/activities" },
    { name: "Blogs", href: "/blogs" },
    { name: "About Us", href: "/about" },
  ];

  const socialIcons = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/mdnpublicschool#",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/mdnps_rohtak",
    },
    { icon: Instagram, label: "Instagram", href: "http://bit.ly/MDNPS_YC" },
    {
      icon: Youtube,
      label: "Youtube",
      href: "https://www.instagram.com/mdnpublicschool/",
    },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    alert("Subscribed!");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">About Us</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Nurturing minds, building character, and shaping futures through
              excellence in education.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialIcons.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white pl-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-foreground transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="h-5 w-5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold ">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 pr-4">
                <MapPin className="h-6 w-6  shrink-0 mt-1" />
                <span className="text-gray-400 text-base">
                  {school?.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-6 w-6  shrink-0" />
                <Link
                  href={`tel:${school?.phone}`}
                  className="text-gray-400 hover: transition-colors text-base"
                >
                  {school?.phone}
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-6 w-6  shrink-0" />
                <Link
                  href={`mailto:${school?.email}`}
                  className="text-gray-400 hover: transition-colors text-base"
                >
                  {school?.email}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            <p className="text-gray-400 text-base">
              Stay updated with our latest news and updates.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-gray-300 placeholder:text-gray-500"
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {school?.logoLabel}. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
