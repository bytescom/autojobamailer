import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CtaSection() {
    return (
        <section className="w-full py-16 md:py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary rounded-full blur-[100px] z-0 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                        Reduce repetitive work. <br />
                        <span className="text-secondary">Focus on getting hired.</span>
                    </h2>

                    <h3 className="mx-auto max-w-[700px] text-blue-100 text-lg md:text-xl font-medium tracking-wide mb-10">
                        Start applying smarter, not harder.
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/signup"
                            className="flex items-center justify-center gap-2 rounded-lg h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-gray-50 transition-colors shadow-xl shadow-blue-900/20 group"
                        >
                            Start Free
                            <FiArrowRight size={20} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="flex items-center justify-center gap-2 rounded-lg h-14 px-8 text-lg font-bold bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-colors group"
                        >
                            See How It Works
                            <FiArrowRight size={20} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <p className="text-[15px] text-blue-200 mt-8 font-medium tracking-wide">
                        No credit card required. Free forever plan available. Cancel anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
