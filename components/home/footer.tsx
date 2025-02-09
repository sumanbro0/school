import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className=" py-8 bg-gray-900 text-primary-foreground ">
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"> */}
        {/* <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-muted-foreground mb-4">
              Nurturing minds, building character, and shaping futures through excellence in education since 1995.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 hover:text-primary ">
              <li>
                <Link href="/admission" className="text-muted-foreground hover:text-primary">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-muted-foreground hover:text-primary">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-muted-foreground hover:text-primary">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-primary">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  123 Education Street, Learning City, ST 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <Link href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                  (123) 456-7890
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <Link href="mailto:info@school.com" className="text-muted-foreground hover:text-primary">
                  info@school.com
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates and news.
            </p>
            <div className="space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
          */}
        {/* </div> */}

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MDN public school. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/#" className="text-muted-foreground hover:text-muted">
              Privacy Policy
            </Link>
            <Link href="/#" className="text-muted-foreground hover:text-muted">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
