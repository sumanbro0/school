import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gray-50">
      <div className="container max-w-6xl  mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            CONTACT US
          </h1>
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" />
                MDN Public School
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-600 mt-1" />
                <div>
                  <p>Northern Bypass,</p>
                  <p>Near New Bus Stand,</p>
                  <p>Rohtak - 124001, Haryana, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-600" />
                <p>+91 92543 53404</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-600" />
                <a
                  href="mailto:admin@mdnps.in"
                  className="text-indigo-600 hover:underline"
                >
                  admin@mdnps.in
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-600" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input placeholder="Mobile No." />
                <Input placeholder="Address" />
                <Textarea placeholder="Message" className="min-h-[100px]" />
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.0288340694584!2d76.60405091501727!3d28.895499982321383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a0d987b0ab%3A0x9f12c0c7b97bac7c!2sNorthern%20Bypass%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1647850687693!5m2!1sen!2sin"
          className="w-full h-[400px] rounded-lg shadow-lg border-0"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
