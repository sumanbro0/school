import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    id: "sports",
    title: "Sports & Athletics",
    description: "Develop teamwork, discipline, and physical fitness through our comprehensive sports programs.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Football", "Basketball", "Swimming", "Athletics"]
  },
  {
    id: "arts",
    title: "Arts & Culture",
    description: "Express creativity and cultural appreciation through various artistic mediums.",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Visual Arts", "Music", "Dance", "Theater"]
  },
  {
    id: "clubs",
    title: "Academic Clubs",
    description: "Explore interests and develop skills through specialized academic clubs.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Science Club", "Debate Club", "Math Club", "Robotics"]
  },
  {
    id: "leadership",
    title: "Leadership Programs",
    description: "Develop essential leadership skills and make a positive impact in the community.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Student Council", "Community Service", "Mentorship"]
  },
  {
    id: "technology",
    title: "Technology & Innovation",
    description: "Explore cutting-edge technology and develop digital skills for the future.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Coding Club", "Digital Media", "3D Printing"]
  },
  {
    id: "environment",
    title: "Environmental Club",
    description: "Promote environmental awareness and sustainability through hands-on projects.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    categories: ["Gardening", "Recycling", "Conservation"]
  }
];

export default function ActivitiesList() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Explore Our Activities
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover a wide range of extracurricular activities designed to nurture talents, build character, and create well-rounded individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Activities List */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <Card key={activity.id} className="group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                    fill
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {activity.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activity.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="link" className="ml-auto group">
                    <Link href={`/activities/${activity.id}`}>
                      Learn More{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}