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
            MDN Public School is affiliated to the Central Board of Secondary
            Education (CBSE) and provides education from classes primary to
            senior-secondary. The curriculum followed is as prescribed by the
            CBSE. The medium of instruction is English and the educational
            material used is approved by NCERT. Evaluation is done following the
            Continuous and Comprehensive Evaluation (CCE) system as per CBSE
            Guidelines.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">
            PRE-PRIMARY SCHOOL (NURSERY TO UKG)
          </h3>
          <p className="mb-4">
            These are the formative years of children and our focus here is on
            activity-based learning. The lessons are well planned around
            experience, experimentation, exploration, and educational trips,
            providing the students with the opportunity to observe and interact
            with their environment, and hence learning in the process. At this
            level, we constantly evaluate and modify the teaching strategy to
            formulate the best education to foster intellectual, emotional,
            physical, social, and aesthetic development of the students. The
            curriculum aims to integrate academics with co-curricular activities
            and sports and to imbibe good values in students at this early point
            of their life.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">
            PRIMARY SCHOOL (CLASSES I TO V)
          </h3>
          <p className="mb-4">
            At this level, the students start feeling at home in school, and it
            is an eager stage of hunger for new learning. The lessons are
            conceived in such a way that the teacher stimulates the interests of
            a student and sparks his imagination. With a well-balanced programme
            that promotes physical as well as mental activity, a healthy
            lifestyle is promoted in the junior school.
          </p>
          <p>
            The students are introduced to reading through visits to the
            extensive library and their creativity is given a boost by means of
            art classes. Participation in sports is encouraged and the teachers
            work on polishing their social skills and identity building. The
            curriculum focuses on better academic performance and fostering
            positive attitudes among students.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">
            MIDDLE SCHOOL (CLASSES V TO VIII)
          </h3>
          <p className="mb-4">
            This is the preamble and preparation to secondary and senior
            secondary education. So the main aim at this level is to provide
            students with an in-depth knowledge of the concepts. This is
            achieved by extensive use of technology that aids classroom teaching
            for better understanding of the difficult subjects. The homework is
            a stimulating revision exercise given generally in the form of
            worksheets.
          </p>
          <p>
            A lot of effort is put into improving spoken English skills of the
            pupils with special attention to correct pronunciation and diction.
            Trips and excursions are organized on a regular basis to add
            experience to education. Also, a variety of co-curricular and sports
            activities are encouraged to ensure a healthy all-round development
            of the students.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">
            SENIOR SECONDARY SCHOOL (CLASSES IX TO XII)
          </h3>
          <p className="mb-4">
            These are the final years of school and are a means to prepare the
            children for life after school, for college and work. Concentrated
            effort in learning is imperative for the realization of future goals
            and ambitions of pupils. The main aim at this level is to prepare
            students according to the CBSE curriculum and the core focus is on
            result-oriented teaching for excellent results.
          </p>
          <p>
            At the +2 level, Science and Commerce are the two academic streams
            offered in the school. And to equip the departments with the proper
            infrastructure for teaching advanced levels of subjects, modern
            laboratories are maintained for practical knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
