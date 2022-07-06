/* eslint-disable @next/next/no-img-element */
import { CircleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const links = [
  { label: "writing", href: "/writing" },
  { label: "speaking", href: "/speaking" },
  { label: "design", href: "/design" },
  { label: "about", href: "/about" },
  { label: "uses", href: "/uses" },
  { label: "YouTube", href: "https://www.youtube.com/mahmoudabdelwahab" },
];
export const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const logoUrl =
    theme === "dark" ? "/images/logo.png" : "/images/logo-black.png";

  return (
    <nav className="py-5">
      <nav className="flex items-center space-x-5 max-w-screen-lg mx-auto text-gray-300 dark:text-gray-200">
        <Link href="/">
          <a className="flex-grow">
            <img src={logoUrl} alt="" srcSet="" className="w-8" />
          </a>
        </Link>
        {/* <ul className="hidden md:flex items-center space-x-6 flex-grow">
          {links.map((link) => {
            return (
              <li
                className={`capitalize  text-lg font-medium tracking-wide p-1.5 hover:text-gray-900 dark:hover:text-gray-100 ${
                  router.asPath === link.href
                    ? "dark:text-gray-100 text-gray-900"
                    : null
                }`}
                key={link.href}
              >
                <Link href={link.href}>
                  <a>{link.label}</a>
                </Link>
              </li>
            );
          })}
        </ul> */}
        <DarkModeToggle />

        <div className="md:hidden">
          <DropdownMenu.Root onOpenChange={() => setIsOpen(!isOpen)}>
            <DropdownMenu.Trigger className={`p-4`}>
              <HamburgerMenuIcon className=" w-6 h-6" />
            </DropdownMenu.Trigger>
            <AnimatePresence>
              {isOpen && (
                <DropdownMenu.Content
                  alignOffset={10}
                  align="end"
                  portalled={false}
                  forceMount
                  asChild
                  className={`w-64`}
                >
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,

                      transition: { delay: 0.7, duration: 0.15 },
                    }}
                    className="p-5 shadow-md bg-gray-50 dark:bg-gray-900 rounded "
                  >
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={sideVariants}
                    >
                      {links.map((link) => {
                        return (
                          <motion.li
                            variants={itemVariants}
                            className={`capitalize font-medium tracking-wide p-1.5 hover:text-blue-300 dark:hover:text-gray-100 ${
                              router.asPath === link.href
                                ? "dark:text-gray-100 text-blue-300"
                                : null
                            }`}
                            key={link.href}
                          >
                            <Link href={link.href}>
                              <a className="">
                                <DropdownMenu.Item>
                                  {link.label}
                                </DropdownMenu.Item>
                              </a>
                            </Link>
                          </motion.li>
                        );
                      })}
                    </motion.div>
                  </motion.ul>
                </DropdownMenu.Content>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        </div>
      </nav>
    </nav>
  );
};
