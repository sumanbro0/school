import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Activities({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {id === "sports"
                ? "Sports & Athletics"
                : id === "arts"
                ? "Arts & Culture"
                : id === "clubs"
                ? "Student Clubs"
                : "School Activities"}
            </h1>
            <p className="text-xl mb-8">
              Discover the diverse range of activities that make our school a
              vibrant learning community
            </p>
            <Button size="lg" variant="secondary">
              Join an Activity
            </Button>
          </div>
        </div>
      </div>

      {/* Rich Text Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2 className="text-3xl font-bold mb-6">About Our Activities</h2>
          <p className="mb-6">
            Our school offers a wide range of activities designed to develop
            students&apos; talents, interests, and leadership skills. Through these
            programs, students learn valuable life skills while building lasting
            friendships and memories.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Program Highlights</h3>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Professional coaching and mentorship</li>
            <li>State-of-the-art facilities</li>
            <li>Regular competitions and showcases</li>
            <li>Leadership opportunities</li>
          </ul>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Activity Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card
                key={item}
                className="overflow-hidden group relative hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <Image
                  fill
                    src={`https://images.unsplash.com/photo-${item}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={`Activity image ${item}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}