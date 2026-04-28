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
              Save money and save lives at our Op Shops
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
              You'll get more than just retail therapy when you shop at one of
              Save the Children's many op shops, situated in convenient
              locations around Australia. Not only will you pick yourself up an
              array of recycled fashion pieces, toys, books and even some
              vintage and modern day gems, your purchases will help to create
              better lives for children in Australia and overseas.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg">
              Our op shops are staffed by friendly volunteers who only add to
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
              Who can volunteer? Our volunteers are inspired by the resilience
              of children. They commit their time to support our op shops,
              events, programs and offices throughout Australia. We couldn’t do
              the work we do without them. Our volunteers range from 18 to 98
              years old. They come from all different backgrounds and bring
              diverse skill sets to our organisation. We value the support of
              every single one of our volunteers and we are always looking for
              new volunteers to help build our community. How volunteering your
              time can help you and help vulnerable children Volunteering is a
              great way to meet new people and become part of a community of
              inspiring supporters. It also gives you the opportunity to improve
              your skills and career prospects. You'll learn new skills while
              using your existing ones. You'll meet new people and make
              wonderful new friends. You’ll learn more about issues affecting
              vulnerable communities here in Australia and overseas. You'll be
              going behind the scenes at one of Australia's leading child rights
              organisations.​ Furthermore, by donating your time you'll be
              playing an integral role in helping us save children's lives and
              give them the opportunity to fulfil their potential. When you
              stand with Save the Children Australia, you’re improving the lives
              of children in Australia and around the world and empowering them
              to make the world a better place.
              <p className="text-blue-600 mt-4">
                <Link to="/volunteer" className="hover:underline font-semibold">
                  Would you love to be a volunteer?
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
