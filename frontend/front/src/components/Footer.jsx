import React from "react";
import assalogo from "./images/assalogo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-xl border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

          {/* Logo + About */}
          <div>
            <img
              src={assalogo}
              alt="Company Logo"
              className="h-8 sm:h-10 mb-4"
            />
            <p className="text-rose-200 text-xs sm:text-sm leading-relaxed">
              Elegant bridal & groom collections crafted with love and luxury.
              Making your special day unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-3 sm:mb-4 tracking-wide text-sm sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bride" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Bride Collection
                </Link>
              </li>
              <li>
                <Link to="/groom" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Groom Collection
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-3 sm:mb-4 tracking-wide text-sm sm:text-base">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-rose-200 hover:text-rose-300 text-sm transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-3 sm:mb-4 tracking-wide text-sm sm:text-base">
              Contact Us
            </h3>
            <p className="text-rose-200 text-xs sm:text-sm mb-2">
              📍 Kochi, Kerala
            </p>
            <p className="text-rose-200 text-xs sm:text-sm mb-2">
              📞 +91 98765 43210
            </p>
            <p className="text-rose-200 text-xs sm:text-sm">
              ✉ info@assabridal.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-5 text-center">
          <p className="text-rose-200 text-xs sm:text-sm">
            © {new Date().getFullYear()} Assa Bridal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;