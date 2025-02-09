"use client";
import { Button } from "@/components/ui/button";
import { useFormModalStore } from "@/hooks/use-form-modal-store";

export default function AboutUs() {
  const { setIsOpen } = useFormModalStore();
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
              With over 25 years of excellence in education, we&apos;re
              committed to nurturing young minds and fostering a love for
              learning that lasts a lifetime.
            </p>
            <Button onClick={() => setIsOpen(true)} size="lg">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <p>
            MDN Public School was started in 1993 with the vision of Mr. Jagbir
            Singh, the Chairman, to help children achieve greater heights in not
            only academics, but also sports. Being an avid sportsman himself,
            captain of his school and college hockey teams, Mr. Jagbir Singh
            believes that an intelligent mind resides in a healthy body and
            therefore, he established a school where sports have an important
            role in the curriculum. He chose the name, MDN, as a tribute to his
            grandmother, Mata Dhapa Narwal, who had been an inspiration and a
            pillar of support to him.
          </p>
          <br />
          <p>
            It began as a humble institute in 1993 with merely 70 students
            studying in 7 rooms. As the years passed, classes were added, and in
            1996 it got provisional recognition up to VIII Standard by the CBSE.
            In 1997, it was recognized as a Secondary School, while the Higher
            Secondary status was given in 2002. Thus, within a few years, it has
            become one of the finest centres of learning, which provides equal
            opportunities to all students, helping them grow into ideal
            citizens.
          </p>
          <br />
          <p>
            Since its inception the core belief has been a holistic approach to
            education, combining tradition with progression. Growth has been a
            constant feature of the school, be it in terms of infrastructure,
            teaching or philosophy. MDN Public School is synonymous with quality
            education and is dedicated towards assisting students to recognize
            and realize their full potential.
          </p>
        </div>
      </section>
    </div>
  );
}
