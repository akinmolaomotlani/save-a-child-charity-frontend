import PageNav from "../components/PageNav";
import ourShop from "../images/shop.jpg";
import VolunteerTwo from "../images/volunteerTwo.jpg";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <>
      <PageNav />
      <main className="w-full">
        <section className="w-full">
          {/* Hero Background */}
          <div
            className="h-[50vh] w-full bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${ourShop})` }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <h2 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center px-4">
              Save Money & Save Lives
            </h2>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
              Save money and save lives at our OP Shops
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
              You'll get more than just retail therapy when you shop at one of
              Save the Children's many op shops, situated in convenient
              locations around United and the world in large. Not only will you
              pick yourself up an array of recycled fashion pieces, toys, books
              and even some vintage and modern day gems, your purchases will
              help to create better lives for children in Australia and
              overseas.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
              Our Op shops are staffed by friendly volunteers who only add to
              the unique shopping experience. Please note, our op shops are
              unable to accept mattresses.
            </p>

            <h5 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
              Op Shop Locations
            </h5>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our stores rely on volunteers to help us operate. As such, the
              opening hours listed below are subject to change at short notice,
              depending on volunteer availability.
            </p>
          </div>
        </section>

        {/* ===== SECTION 2 ===== */}
        <section className="w-full">
          <div
            className="h-[50vh] w-full bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${VolunteerTwo})` }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <h2 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center px-4"></h2>
          </div>

          <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
              Who can volunteer
            </h3>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Anyone with a kind heart can volunteer with us. Our volunteers
              come from all walks of life and every age group, united by one
              purpose helping children build brighter futures. By giving a
              little of your time, you can bring hope, care, and opportunity to
              vulnerable children while becoming part of a compassionate and
              inspiring community. Volunteering is more than helping others it’s
              about creating meaningful connections, learning new skills, and
              making a real difference in a child’s life. Together, we can give
              children the chance to feel safe, dream bigger, and live better.
              <p className="text-blue-600 mt-4">
                <Link to="/volunteer" className="hover:underline font-semibold">
                  Give Hope. Share Kindness. Volunteer With Us
                </Link>
              </p>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
