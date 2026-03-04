import React from "react";
import assalogo from "./images/assalogo.png";

function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-xl border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <img src={assalogo} alt="Company Logo" className="h-10 mb-4" />
            <p className="text-rose-200 text-sm leading-relaxed">
              Elegant bridal & groom collections crafted with love and luxury.
              Making your special day unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Bride Collection", "Groom Collection", "Book Appointment"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-rose-200 hover:text-rose-300 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              {["About Us", "Contact", "Privacy Policy", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-rose-200 hover:text-rose-300 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-rose-300 font-semibold mb-4 tracking-wide">
              Contact Us
            </h3>
            <p className="text-rose-200 text-sm mb-2">
              📍 123 Wedding Street, Fashion City
            </p>
            <p className="text-rose-200 text-sm mb-2">
              📞 +91 98765 43210
            </p>
            <p className="text-rose-200 text-sm">
              ✉ info@assabridal.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-rose-200 text-sm">
            © {new Date().getFullYear()} Assa Bridal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
