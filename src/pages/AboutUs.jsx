import PageNav from "../components/PageNav";
import aboutBg from "../images/aboutus.jpg";
import managingD from "../images/CEO.jpg";
import Voluntier from "../images/volunteer.jpg";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <>
      <PageNav />
      <section className="bg-gray-50 py-2 sm:py-2 md:py-2 lg:py-2">
        {/* Hero Background */}
        <div
          className="h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] 
               bg-cover bg-center 
               rounded-none sm:rounded-lg 
               shadow-none sm:shadow-md 
               max-w-full lg:max-w-6xl 
               mx-auto"
          style={{ backgroundImage: `url(${aboutBg})` }}
        ></div>

        {/* Content */}
        <div
          className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl 
                  mx-auto 
                  px-4 sm:px-6 md:px-8 
                  mt-8 sm:mt-10 md:mt-12 
                  text-gray-700"
        >
          {/* Main Heading */}
          <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                   font-bold 
                   text-gray-900 
                   mb-4 sm:mb-6 
                   text-center"
          >
            Our Team
          </h3>

          {/* Paragraph */}
          <p
            className="text-base sm:text-lg md:text-xl 
                  leading-relaxed 
                  mb-6 sm:mb-8"
          >
            In a world where millions of children wake up to uncertainty instead
            of opportunity,
            <span className="font-semibold text-orange-600">
              {" "}
              Save A Child Charity Organization
            </span>{" "}
            stands as a beacon of hope. Across war-torn regions, underserved
            communities, and forgotten streets, the organization works
            tirelessly to protect, educate, and empower vulnerable children.
            <span className="font-semibold">
              {" "}
              Every child deserves safety, education, and a chance to dream.
            </span>
          </p>

          {/* Sub Heading */}
          <h4
            className="text-xl sm:text-2xl md:text-3xl 
                   font-semibold 
                   text-gray-900 
                   mb-3 sm:mb-4"
          >
            A Team Driven by Compassion
          </h4>

          <p
            className="text-base sm:text-lg md:text-xl 
                  leading-relaxed 
                  mb-4 sm:mb-6"
          >
            Behind every success story is a team of dedicated professionals and
            volunteers whose hearts beat for children.
            <span className="font-semibold">
              {" "}
              The staff of Save A Child are not just workers, they are:
            </span>
          </p>

          {/* List */}
          <ol
            className="list-disc list-inside 
                   space-y-2 sm:space-y-3 md:space-y-4 
                   text-base sm:text-lg md:text-xl 
                   text-gray-800"
          >
            <li className="leading-relaxed">
              Humanitarian responders who enter crisis zones with courage.
            </li>
            <li className="leading-relaxed">
              Educators who build classrooms where there were once none.
            </li>
            <li className="leading-relaxed">
              Counselors and social workers who restore emotional strength.
            </li>
            <li className="leading-relaxed">
              Community advocates who ensure every child’s voice is heard.
            </li>
          </ol>
        </div>
      </section>
      <section className="bg-[#Fff]">
        {/* Managing Director Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-16">
          {/* Image Section */}
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={managingD}
              alt="Our Managing Director"
              className="w-full max-w-md h-auto md:h-80 object-cover shadow-lg rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif mb-4">
              Our Managing Director
            </h4>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans">
              Our CEO, Babara Khilani has built a strong and respected public
              profile as a passionate advocate for vulnerable children through
              strategic partnerships, community outreach, and global
              humanitarian campaigns. With years of leadership in international
              child-focused initiatives, she has overseen programs delivering
              emergency relief, access to quality education, child protection
              services, and long-term development support to underserved
              communities around the world.
            </p>
          </div>
        </div>

        {/* Volunteer Team Section */}
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 pb-16">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif mb-4">
              Our Volunteer Team
            </h4>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-sans">
              Our Save A Child Volunteer Team is the driving force behind our
              mission. They selflessly dedicate their time, skills, and
              compassion to support vulnerable children worldwide. From
              educational outreach to emergency relief efforts, they serve
              wherever help is needed most. They work in underserved and
              crisis-affected communities with unwavering commitment. Guided by
              empathy and purpose, they put children’s needs above their own.
              Through their dedication, they help create safer, brighter futures
              for every child they reach.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={Voluntier}
              alt="Our Volunteer Team"
              className="w-full max-w-md h-auto md:h-80 object-cover shadow-lg rounded-lg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
