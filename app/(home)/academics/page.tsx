import { Card, CardContent } from "@/components/ui/card";

export default function Academics() {
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Academic Excellence
            </h1>
            <p className="text-xl md:text-2xl">
              Nurturing Minds, Shaping Futures
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2 className="text-3xl font-bold mb-6">Our Academic Program</h2>
          <p className="mb-4">
            At our school, we believe in providing a comprehensive education that
            prepares students for success in their academic and personal lives. Our
            curriculum is designed to challenge and inspire students while fostering
            critical thinking and creativity.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Primary Education</h3>
          <p className="mb-4">
            Our primary education program focuses on building strong foundations in
            core subjects while nurturing curiosity and love for learning. We
            employ innovative teaching methods and maintain small class sizes to
            ensure individual attention.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Secondary Education</h3>
          <p className="mb-4">
            The secondary education program is designed to prepare students for
            higher education and future careers. We offer a wide range of subjects
            and advanced placement courses, supported by state-of-the-art
            facilities and experienced faculty.
          </p>

          <Card className="mt-12">
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-4">Key Features</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Small class sizes for personalized attention
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Experienced and qualified teaching staff
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Modern facilities and resources
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Regular assessments and feedback
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Extra-curricular activities
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}