import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#001F54] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-xl md:text-2xl font-bold mb-4">About Us</h4>
          <p className="text-white/90 text-sm md:text-base cursor-default">
            Save A Child is dedicated to helping children in need across the
            world—providing education, shelter, and support for those affected
            by wars and poverty.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl md:text-2xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white/90 text-sm md:text-base">
            <li>
              <a href="/" className="hover:text-white cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white cursor-pointer">
                About Us
              </a>
            </li>
            <li>
              <a href="/donate" className="hover:text-white cursor-pointer">
                Donate
              </a>
            </li>
            <li>
              <a href="/volunteer" className="hover:text-white cursor-pointer">
                Volunteer
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white cursor-pointer">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-white/90 text-sm md:text-base">
            <li>
              Email:{" "}
              <a
                href="mailto:info@saveachild.org"
                className="hover:text-white cursor-pointer"
              >
                info@saveachild.org
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-white cursor-pointer"
              >
                +1 234 567 890
              </a>
            </li>
            <li>Address: 123 Charity St, Cityville, Country</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl md:text-2xl font-bold mb-4">Newsletter</h4>
          <p className="text-white/90 text-sm md:text-base mb-2">
            Subscribe to stay updated on our latest projects and campaigns.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-md text-gray-900 flex-1"
            />
            <button
              type="submit"
              className="bg-white text-[#001F54] px-4 py-2 rounded-md hover:bg-gray-100 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-10 border-t border-white/30 pt-6 text-center text-white/80 text-sm md:text-base">
        <div className="flex justify-center space-x-6 mb-4 text-2xl md:text-3xl">
          <a href="#" className="hover:text-white cursor-pointer">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white cursor-pointer">
            <FaLinkedinIn />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Save A Child. All rights reserved.</p>
      </div>
    </footer>
  );
}
