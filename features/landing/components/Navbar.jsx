"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[60px] md:h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Global navigation"
      >
        {/* Brand / Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1.5" aria-label="Autojobmailer home">
            <Image
              src="/icon.svg"
              alt="Autojobmailer Logo"
              width={32}
              height={32}
              className="h-5 sm:h-6 w-auto rounded-md"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-primary">
              Autojobmailer<span className="text-secondary">.</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="hidden md:flex items-center gap-7 text-base font-medium text-text">
            <li>
              <Link href="/#features" className="hover:text-primary transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/#faqs" className="hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Primary CTA */}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[44px] rounded-lg bg-secondary sm:px-5 px-3.5 sm:py-2.5 py-1.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            Login
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-text-dark hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white/95 backdrop-blur-lg px-4 py-4 shadow-lg animate-page-transition">
          <ul className="flex flex-col gap-3 text-base font-medium text-text-dark">
            <li>
              <Link
                href="/#features"
                onClick={closeMenu}
                className="block py-2 hover:text-primary transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/#how-it-works"
                onClick={closeMenu}
                className="block py-2 hover:text-primary transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/#faqs"
                onClick={closeMenu}
                className="block py-2 hover:text-primary transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block py-2 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li className="pt-2 border-t border-gray-100 flex items-center justify-between gap-4">
              <Link
                href="/login"
                onClick={closeMenu}
                className="w-1/2 text-center py-2.5 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
