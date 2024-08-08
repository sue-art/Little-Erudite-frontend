import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../../pages/Auth/AuthContext";

const navigation = [
  { name: "SERIES", href: "/admin/series" },
  { name: "Roadmap", href: "/admin/roadmap" },

  { name: "Google Search", href: "/admin/dashboard" },

  { name: "BOOKS", href: "/admin/books" },
  { name: "QUIZZES", href: "/admin/quizzes" },
  { name: "BLOG", href: "/admin/bloglist" },
];

const AdminNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const logo = window.location.origin + "/logo_01.png";

  const handleLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="dairy-cream flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/admin/dashboard">
              <span className="sr-only">Little Erudite</span>
              <img src={logo} alt="Little Erudite" width="150" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <div className="flex -space-x-1 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <button onClick={handleLogout}> Logout</button>
              </div>
            ) : (
              <Link to="/sign-in">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="dark fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/admin/dashboard">
                <span className="sr-only">Little Erudite</span>
                <img src={logo} alt="Little Erudite" width="120" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/sign-in"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </Fragment>
  );
};

export default AdminNavbar;
