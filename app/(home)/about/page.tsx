import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Shaping Tomorrow&apos;s Leaders
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              With over 25 years of excellence in education, we&apos;re committed to
              nurturing young minds and fostering a love for learning that lasts a
              lifetime.
            </p>
            <Button size="lg">Schedule a Visit</Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Life at Our School
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                  width={256}
                    height={384}
                  src={`https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000`}
                    alt={`Gallery image ${item}`}
                    className="w-full h-64 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Watch Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000')] ">
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-16 h-16 rounded-full"
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Our Journey of Excellence
              </h3>
              <p className="text-muted-foreground mb-6">
                Watch how we&apos;ve grown from a small school to one of the region&apos;s
                most respected educational institutions, maintaining our commitment
                to excellence every step of the way.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  State-of-the-art facilities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Experienced faculty
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Holistic development approach
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}