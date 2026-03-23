import React from "react";
import assalogo from "./images/assalogo.png";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/hut" },
  { name: "All Bookings", path: "/bht" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbartwo() {
  const location = useLocation();

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
                  Vendor Panel
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
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}