import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const navigation = [
    { name: "About", href: "about" },
    { name: "Pricing", href: "pricing" },
    { name: "PropertyHelpers Concierge™", href: "property-helpers" },
    { name: "Article Center", href: "article-center" },
];

export default function Header(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const href = window.location.href;

        if (href.includes("appeal")) {
            setActive(true);
        }
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 20
            );
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <div className="bg-white">
            <header
                className={`top-0 z-30 fixed w-full bg-green-200 transition-opacity ease-in duration-600 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
            >
                <nav
                    className="flex items-center justify-between p-2 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        {/* <Link href={route("welcome")} className="-m-1.5 p-1.5">
              <span className="sr-only">CompsGuru</span>
              <img className="h-20 w-auto" src="/images/cf_logo.png" alt="" />
            </Link> */}
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
                        {/* {navigation.map((item) => (
              <Link
                key={item.name}
                href={route(item.href)}
                className="text-md font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))} */}
                        {/* <Link
              href="/#contact"
              className="text-md font-semibold leading-6 text-gray-900"
            >
              Contact
            </Link> */}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {props.auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    as="button"
                                    type="button"
                                    className="ml-4 font-semibold rounded-md p-2.5 text-white bg-blue-800 hover:bg-blue-500 focus:outline focus:outline-2 focus:rounded-sm f"
                                >
                                    Sign In
                                </Link>

                                {/* <Link
                  href={route("appeal")}
                  as="button"
                  id="start-appeal"
                  type="button"
                  className={`ml-4 font-semibold rounded-md p-2.5 text-gray ${
                    active ? "bg-green-500 " : ""
                  } bg-white focus:outline hover:bg-green-400 focus:outline-2 focus:rounded-sm`}
                >
                  Start Appeal
                </Link> */}

                                {/* <Link
                  href={route("register")}
                  className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  Register
                </Link> */}
                            </>
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
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">CompGurus</span>
                                <img
                                    className="h-20 w-auto"
                                    src="/images/cf_logo.png"
                                    alt=""
                                />
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/#contact"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Contact
                                </Link>
                                <div className="py-6">
                                    {props.auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            >
                                                Sign In
                                            </Link>
                                            <br />
                                            {/* <Link
                        href={route("appeal")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                      >
                        Start Appeal
                      </Link> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    );
}
