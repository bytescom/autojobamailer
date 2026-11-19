"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { MdHelp, MdSecurity, MdAutoAwesome, MdCheckCircle, MdMenuBook } from 'react-icons/md';

const faqData = [
    {
        question: "How does Autojobmailer work?",
        answer: "Autojobmailer is an AI job application tool designed to automate job applications. You create your profile, add target companies, and our job application email generator creates personalized application emails that you can send directly from your connected Gmail account using the built-in job application tracker.",
        icon: <MdHelp size={24} />,
        category: "Product"
    },
    {
        question: "Is my Gmail account safe to connect?",
        answer: "Yes. We use Google's secure OAuth authentication. Autojobmailer never stores your Gmail password and only sends emails with your permission.",
        icon: <MdSecurity size={24} />,
        category: "Security"
    },
    {
        question: "Will the emails look like spam?",
        answer: "No. Autojobmailer generates personalized emails tailored to each company, which helps your applications look professional and human-written.",
        icon: <MdAutoAwesome size={24} />,
        category: "AI"
    },
    {
        question: "Can I track my job applications?",
        answer: "Yes. Autojobmailer includes a tracking dashboard where you can monitor sent emails, follow-ups, and application status in one place.",
        icon: <MdCheckCircle size={24} />,
        category: "Features"
    },
    {
        question: "Do I need technical skills to use Autojobmailer?",
        answer: "No. The platform is designed for simplicity. You just add company contacts, generate emails, and send applications with a few clicks.",
        icon: <MdMenuBook size={24} />,
        category: "General"
    },
];

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="w-full py-14 sm:py-24 md:py-32 bg-background relative overflow-hidden">
            <span id="faq" className="absolute -top-10" />
            {/* Decorative gradient accents - Secondary/Orange theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/4 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/3 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-secondary/10 text-secondary text-sm font-bold tracking-wider mb-6">
                        <span className="text-base">❓</span> FAQs
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-5 tracking-tight leading-tight">
                        Frequently <span className="text-secondary">Asked Questions</span>
                    </h2>
                    <p className="text-lg text-text/80 font-medium tracking-wide">
                        Find answers to common questions about our platform.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqData.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`border rounded-xl transition-all duration-300 overflow-hidden ${isOpen
                                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                                        : 'border-gray-200 bg-background hover:border-gray-300 hover:shadow-sm'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full text-left px-6 py-5 md:py-6 flex items-start gap-4 focus:outline-none cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className={`mt-0.5 shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {faq.icon && faq.icon}
                                    </div>
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg md:text-xl font-bold text-text-dark tracking-tight">
                                                {faq.question}
                                            </span>
                                            <FiChevronDown
                                                size={20}
                                                className={`text-gray-400 transition-transform duration-300 shrink-0 ml-2 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                                            />
                                        </div>
                                        {isOpen && (
                                            <p className="mt-3 text-text/80 leading-relaxed text-base">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Call To Action Box inside FAQ */}
                <div className="mt-10 lg:mt-20">
                    <div className="relative overflow-hidden rounded-xl bg-background border border-gray-200 p-8 sm:p-12 text-center shadow-sm">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3 text-text-dark tracking-tight">
                                Still have questions?
                            </h3>
                            <p className="text-text/80 font-medium mb-8 text-lg">
                                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 bg-primary text-white hover:bg-primary/90 transition-colors duration-200 font-bold shadow-md shadow-primary/20 text-[15px] rounded-lg"
                                >
                                    Contact Support
                                </Link>
                                <Link
                                    href="/signup"
                                    className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 bg-background border border-gray-300 text-text rounded-lg hover:bg-gray-50 transition-colors duration-200 font-bold shadow-sm text-[15px]"
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
