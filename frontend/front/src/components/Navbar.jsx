import React from "react";
import assalogo from "./images/assalogo.png";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/huth" },
  { name: "Bride Collection", path: "/bp" },
  { name: "Groom Collection", path: "/gp" },
  { name: "My Bookings", path: "/mb" },
  { name: "About Us", path: "/a" },
  { name: "Contact", path: "/c" },
  { name: "My Cart", path: "/cp" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 
      bg-white/10 backdrop-blur-xl 
      border-b border-white/20 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img src={assalogo} alt="logo" className="h-9" />
                <span className="text-white font-bold hidden sm:block">
                  Assa Rentals
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        isActive
                          ? "bg-white/25 text-white shadow-md"
                          : "text-white/90 hover:text-white hover:bg-white/20",
                        "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {token && (
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 rounded-xl 
                    bg-red-500 text-white font-semibold 
                    hover:bg-red-600 transition-all duration-300 shadow-md"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Button */}
              <div className="md:hidden">
                <Disclosure.Button className="p-2 text-white hover:bg-white/20 rounded-lg transition">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden px-4 pb-4 bg-white/10 backdrop-blur-xl border-t border-white/20">
            <div className="flex flex-col gap-2 mt-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  {item.name}
                </Link>
              ))}

              {token && (
                <button
                  onClick={handleLogout}
                  className="mt-2 text-left px-4 py-2 rounded-lg 
                  bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}