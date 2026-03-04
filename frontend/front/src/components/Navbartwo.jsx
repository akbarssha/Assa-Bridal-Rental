import React from "react";
import assalogo from "./images/assalogo.png";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/hut" },
  { name: "All Bookings", path: "/bht" }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbartwo() {
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-black hover:bg-white/20 transition">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo + Desktop Menu */}
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Link to="/">
                    <img alt="Assa Rentals" src={assalogo} className="h-8 w-auto" />
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
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
                            "rounded-md px-3 py-2 text-sm font-semibold tracking-wide transition-all duration-300"
                          )}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden bg-white/10 backdrop-blur-xl">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isCurrent = location.pathname === item.path;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.path}
                    className={classNames(
                      isCurrent
                        ? "bg-white/20 text-white"
                        : "text-white hover:text-black hover:bg-white/20",
                      "block rounded-md px-3 py-2 text-base font-medium transition-all"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbartwo;