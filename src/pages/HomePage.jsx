import ContactBtn from "../components/ContactBtn";
import PageNav from "../components/PageNav";
import heroDesktop from "../images/heroBg.jpg";
import heroMobile from "../images/heroMobile.png";
import partnerOne from "../images/partnerOne.png";
import partnerTwo from "../images/partnerTwo.png";
import partnerThree from "../images/partnerThree.jpeg";
import partnerFour from "../images/partnerFour.png";
import partnerFive from "../images/partnerFive.png";
import Footer from "./Footer";
import Ourwork from "./OurWork";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="w-full overflow-x-hidden">
      {/* Sticky Navigation */}
      <PageNav className="sticky top-0 z-50 bg-gray-100 shadow-md" />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-start bg-cover bg-center
                   md:bg-[url('/src/images/heroBg.jpg')]
                   bg-[url('/src/images/heroMobile.png')]"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-white px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-xl text-left">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                Save the Child
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-md">
                In places where conflict, poverty, and crisis steal childhoods,
                your compassion brings protection, food, and hope. Together,
                <br />
                we can turn survival into opportunity.
              </p>
            </div>
            <ContactBtn />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full flex justify-center py-16 px-4 bg-gray-50">
        <div className="max-w-6xl w-full text-center space-y-10">
          <div>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 leading-relaxed tracking-normal max-w-4xl mx-auto">
              At{" "}
              <span className="text-orange-500">
                Save a Child Charity Organization
              </span>
              , our work would not be possible without the incredible support of
              compassionate companies and selfless individuals who believe in
              creating a better world. Together, we are transforming lives,
              restoring hope, and building stronger communities.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              partnerOne,
              partnerTwo,
              partnerThree,
              partnerFour,
              partnerFive,
            ].map((partner, idx) => (
              <div
                key={idx}
                className="h-32 w-full max-w-[160px] sm:max-w-[180px] bg-white shadow rounded flex items-center justify-center"
              >
                <img
                  src={partner}
                  alt={`Partner ${idx + 1}`}
                  className="h-16 w-auto object-contain filter grayscale opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <Ourwork />

      {/* Footer */}
      <Footer />
    </section>
  );
}
