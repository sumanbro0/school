// components/WhyChooseUs.tsx
import React from "react";
import {
  Building2,
  Globe,
  BookOpen,
  Palette,
  GraduationCap,
  Wifi,
  Users,
  Award,
  Heart,
} from "lucide-react";

const features = [
  {
    Icon: Building2,
    title: "Modern Facilities",
    description: "State-of-the-art classrooms and labs",
  },
  {
    Icon: Globe,
    title: "Global Perspective",
    description: "International exchange programs",
  },
  {
    Icon: BookOpen,
    title: "Rigorous Curriculum",
    description: "Research-based learning approach",
  },
  {
    Icon: Palette,
    title: "Arts & Athletics",
    description: "Well-rounded extracurricular activities",
  },
  {
    Icon: GraduationCap,
    title: "College Prep",
    description: "Strong college acceptance rates",
  },
  {
    Icon: Wifi,
    title: "Technology Integration",
    description: "Digital learning tools in every classroom",
  },
  {
    Icon: Users,
    title: "Small Class Sizes",
    description: "Personalized attention for each student",
  },
  {
    Icon: Award,
    title: "Accredited Programs",
    description: "Recognized by educational authorities",
  },
  {
    Icon: Heart,
    title: "Supportive Community",
    description: "Inclusive and nurturing environment",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <div className="container max-w-max mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-16">
          Why Choose Our School?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-full mr-4 group-hover:bg-indigo-200 transition-colors duration-300">
                  <feature.Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
