"use client";

import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
    return (
        <main className="min-h-[85vh] w-full relative flex items-center justify-center">
            {/* Dashed Center Fade Grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #d6d3d1 1px, transparent 1px),linear-gradient(to bottom, #d6d3d1 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    maskImage: `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)`,
                    WebkitMaskImage: `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)`,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />

            <div className="relative z-10 max-w-3xl sm:max-w-4xl sm:mx-auto px-4 lg:px-8 py-16 md:py-24 flex flex-col items-start sm:items-center text-left sm:text-center gap-6 sm:gap-8">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-secondary/25 bg-secondary/10 whitespace-nowrap">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-secondary animate-pulse" />
                    <span className="font-mono text-sm font-medium text-secondary tracking-wide">
                        AI-Powered Job Application Tool
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-text-dark drop-shadow-sm leading-[1.1]">
                    Stop Applying Manually. <br className="hidden sm:block" />
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
                        Let AI Send 100+ Applications for You.
                    </span>
                </h1>

                {/* Subtitle */}
                <h2 className="text-md sm:text-xl md:text-2xl text-text/80 max-w-3xl leading-relaxed px-2">
                    Create personalized emails, send applications faster, and keep track of every response — without repeating the same work.
                </h2>

                {/* Action CTA Section */}
                <div className="w-full flex flex-col items-center justify-center gap-4 pt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/signup"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[50px] rounded-lg bg-secondary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-secondary/25 hover:opacity-90 transition-all duration-200 active:scale-95"
                        >
                            Get Started Free
                            <FiArrowRight size={18} />
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[50px] rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-text-dark hover:bg-gray-50 transition-all duration-200 shadow-sm"
                        >
                            See How It Works
                        </Link>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-text/70 font-medium">
                        <span className="text-primary font-semibold">✨ Free forever plan available</span>
                        <span>•</span>
                        <span>No credit card required</span>
                        <span>•</span>
                        <span>Direct Gmail sync</span>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Hero;
