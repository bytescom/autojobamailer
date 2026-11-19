"use client";

import Link from "next/link";
import Image from "next/image";
import { FiTwitter, FiGithub } from "react-icons/fi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "/#features" },
                { name: "How It Works", href: "/#how-it-works" },
                { name: "FAQs", href: "/#faqs" },
                { name: "Get Started", href: "/signup" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Contact", href: "/contact" },
                { name: "Sign In", href: "/login" },
                { name: "Sign Up", href: "/signup" },
            ],
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
            ],
        },
    ];

    const socialLinks = [
        { name: "Twitter", href: "https://x.com/justpankajk", icon: FiTwitter },
        { name: "GitHub", href: "https://github.com/bytescom", icon: FiGithub },
    ];

    return (
        <footer id="footer" className="w-full border-t border-gray-200 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="absolute inset-0 bg-[#f8fafc] opacity-50" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-14 sm:py-16">
                    <div className="grid gap-12 lg:grid-cols-12 mb-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-5 space-y-4">
                            <Link href="/" className="flex items-center gap-2" aria-label="Autojobmailer home">
                                <Image
                                    src="/icon.svg"
                                    alt="Autojobmailer Logo"
                                    width={32}
                                    height={32}
                                    className="h-6 w-auto rounded-md"
                                />
                                <span className="text-xl font-bold tracking-tight text-primary">
                                    Autojobmailer<span className="text-secondary">.</span>
                                </span>
                            </Link>

                            <p className="text-text/80 text-sm leading-relaxed max-w-sm">
                                Stop applying manually. Let AI send 100+ personalized job applications for you and keep track of every interview opportunity.
                            </p>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:col-span-7">
                            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3">
                                {footerSections.map((section) => (
                                    <div key={section.title} className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-text-dark">
                                            {section.title}
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {section.links.map((link) => (
                                                <li key={link.name}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-sm font-medium text-text/80 hover:text-primary transition-colors duration-200 block"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm border-t border-gray-200/80 pt-8">
                        <p className="text-text/70 font-medium">
                            &copy; {currentYear} Autojobmailer by{" "}
                            <Link
                                href="https://x.com/justpankajk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 transition-colors font-bold"
                            >
                                justpankajk
                            </Link>
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-text-dark transition-all duration-300 hover:scale-105"
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </Link>
                                ))}
                            </div>

                            <div className="hidden sm:flex items-center gap-4 text-xs text-text/70">
                                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                                <span>•</span>
                                <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                                <span>•</span>
                                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                                <span>•</span>
                                <span className="font-semibold text-text-dark/60 bg-gray-100 px-1.5 py-0.5 rounded">v3.3.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
