import ContactBtn from "../components/ContactBtn";
import PageNav from "../components/PageNav";

import heroDesktop from "../images/heroBg.webp";
import heroMobile from "../images/heroMobile.webp";

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

  // Smooth scroll for hash links
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

  const partners = [
    partnerOne,
    partnerTwo,
    partnerThree,
    partnerFour,
    partnerFive,
  ];

  return (
    <main className="w-full overflow-x-hidden">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50">
        <PageNav />
      </div>

      {/* Hero Section */}
      <section
        className="
          hero-section
          relative
          min-h-screen
          flex
          items-center
          justify-start
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${heroMobile})`,
        }}
      >
        {/* Desktop Background Override */}
        <style>
          {`
            @media (min-width: 768px) {
              .hero-section {
                background-image: url(${heroDesktop}) !important;
              }
            }
          `}
        </style>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-20">
          <div className="max-w-2xl text-white">
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400 text-sm font-medium tracking-wide">
              Together We Can Save Lives
            </span>

            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-extrabold
                leading-tight
                tracking-tight
                mb-6
              "
            >
              Save a Child
            </h1>

            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
                text-white/90
                max-w-xl
                mb-8
              "
            >
              In places where conflict, poverty, and crisis steal childhoods,
              your compassion brings protection, food, shelter, education, and
              hope for a brighter tomorrow.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ContactBtn />

              <a
                href="#our-work"
                className="
                  px-6
                  py-3
                  rounded-lg
                  border
                  border-white/40
                  text-white
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                  font-medium
                "
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Trusted Partners
            </h2>

            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                font-medium
                text-gray-700
                leading-relaxed
                max-w-4xl
                mx-auto
              "
            >
              At{" "}
              <span className="text-orange-500 font-semibold">
                Save a Child Charity Organization
              </span>
              , our mission is powered by compassionate companies and generous
              individuals dedicated to transforming lives and restoring hope.
            </p>
          </div>

          {/* Partners Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="
                  h-32
                  w-full
                  max-w-[160px]
                  sm:max-w-[180px]
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  p-6
                  hover:-translate-y-1
                "
              >
                <img
                  src={partner}
                  loading="lazy"
                  decoding="async"
                  alt={`Partner ${idx + 1}`}
                  className="
                    h-16
                    w-auto
                    object-contain
                    grayscale
                    opacity-70
                    hover:grayscale-0
                    hover:opacity-100
                    transition-all
                    duration-300
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="our-work">
        <Ourwork />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
