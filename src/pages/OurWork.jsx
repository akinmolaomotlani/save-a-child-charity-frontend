import ourworkBg from "../images/donate.jpg";

import support from "../images/support.jpg";
import EductionAccess from "../images/education.jpg";
import homelessCare from "../images/homelessCare.jpg";

export default function Ourwork() {
  return (
    <section className="w-full bg-gray-50" id="ourwork">
      {/* HERO SECTION */}
      <div
        className="relative h-[70vh] w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${ourworkBg})` }}
      >
        {/* Cleaner Professional Overlay */}
        <div className="absolute inset-0  from-black/80 via-black/60 to-black/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Our Work
          </h1>
          <p className="text-lg md:text-2xl mt-6 max-w-2xl">
            Creating hope and opportunity for children worldwide.
          </p>
        </div>
      </div>

      {/* MISSION STATEMENT */}
      <div className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h4 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
          Across the United States and around the world, we give children a
          brighter future by ensuring they have opportunities for safety,
          education, and growth.
        </h4>
      </div>

      {/* CONTENT SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 pb-20">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={support}
              alt="Children in conflict zones"
              className="w-full rounded-2xl shadow-xl object-cover"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h5 className="text-3xl font-bold mb-6 text-gray-900">
              Children in Conflict Zones: Bringing Safety and Hope
            </h5>
            <p className="text-gray-600 text-lg leading-relaxed">
              Save Child Charity works tirelessly to support children caught in
              war and conflict. They provide emergency aid such as food, clean
              water, and medical care, while creating safe spaces where children
              can feel protected. Trained counselors help them cope with trauma,
              and educational programs ensure they don’t miss out on learning
              despite instability. Through a combination of immediate relief and
              long-term support, the charity helps war-affected children reclaim
              safety and hope for the future.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={EductionAccess}
              alt="Children education programs"
              className="w-full rounded-2xl shadow-xl object-cover"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h5 className="text-3xl font-bold mb-6 text-gray-900">
              Children Accessing Education
            </h5>
            <p className="text-gray-600 text-lg leading-relaxed">
              For children living on the streets, Save Child Charity focuses on
              protection and reintegration. Outreach teams identify vulnerable
              children, provide shelter, nutritious meals, and healthcare, and
              work to reunite them with families when possible. Life skills
              training, mentorship, and access to education give street children
              the tools they need to build a stable and independent life.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={homelessCare}
              alt="Healthcare for children"
              className="w-full rounded-2xl shadow-xl object-cover"
            />
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h5 className="text-3xl font-bold mb-6 text-gray-900">
              Homeless Children: Care, Support, and Opportunity
            </h5>
            <p className="text-gray-600 text-lg leading-relaxed">
              Homeless children receive comprehensive care through the charity’s
              programs. Temporary shelters, healthcare, clothing, and regular
              meals ensure their basic needs are met. Beyond survival, Save
              Child Charity provides education and vocational training,
              fostering self-confidence and long-term independence. These
              efforts aim to break the cycle of homelessness and give children a
              safe, nurturing environment to grow and thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
