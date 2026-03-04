import React from "react";
import assalogo from "./images/assalogo.png";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ define token
const handleLogout = () => {
  localStorage.removeItem("token"); // ✅ remove only token
  // DO NOT use localStorage.clear()
    navigate("/"); 
  };

  return (

    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/">
                  <img
                    alt="Assa Rentals"
                    src={assalogo}
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex space-x-4 items-center">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        isCurrent
                          ? "bg-white/20 text-white"
                          : "text-white hover:text-black hover:bg-white/20",
                        "rounded-md px-3 py-2 text-sm font-semibold transition"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* ✅ Logout Button */}
                {token && (
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <Disclosure.Button className="p-2 text-white">
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
          <Disclosure.Panel className="sm:hidden bg-white/10 backdrop-blur-xl">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.path}
                  className="block rounded-md px-3 py-2 text-white"
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {/* ✅ Mobile Logout */}
              {token && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 font-semibold"
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

export default Navbar;