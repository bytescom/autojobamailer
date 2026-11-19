import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect to get started with your job search.",
        features: [
            "10 AI emails per day",
            "Manual contact entry",
            "Basic tracking board",
            "Profile templates",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$19",
        period: "/month",
        description: "Best for active job seekers applying to multiple roles",
        features: [
            "Up to 500 applications/week",
            "1,000 AI email generations",
            "Bulk CSV/text import",
            "Auto follow-ups",
            "Advanced analytics",
            "Email scheduling"
        ],
        cta: "Start Pro Trial",
        popular: true,
    },
];

export default function Pricing() {
    return (
        <section className="py-24 bg-secondary/3 relative overflow-hidden">
            {/* Decorative gradient accents - Primary/Blue theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/4 rounded-full blur-[100px] z-0 pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/3 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="mx-auto text-center mb-16">
                    <h2 className="text-[52px] md:text-6xl font-[700] text-text-dark mb-4 tracking-[-0.04em] leading-tight">
                        Simple, <span className="text-primary">Transparent</span> Pricing
                    </h2>
                    <div className="mt-4 flex flex-col items-center gap-1 text-text/80 text-[20px] tracking-tight">
                        <p>Free plan to get started.</p>
                        <p>Upgrade when you need more applications.</p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 md:grid-cols-2 max-w-[840px] mx-auto items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-xl p-10 bg-background ${plan.popular
                                    ? "border-2 border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:mt-0"
                                    : "border border-gray-200 shadow-sm sm:mt-1.5"
                                }`}
                        >
                            {/* "Most Popular" Pill */}
                            {plan.popular && (
                                <div className="absolute -top-[14px] left-[50%] -translate-x-[50%] z-10">
                                    <div className="inline-flex items-center rounded-lg px-[18px] py-[6px] text-[13px] font-[600] tracking-wide bg-primary text-white">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-[24px]">
                                <h3 className="text-[24px] font-[600] text-text-dark mb-2">{plan.name}</h3>
                                <p className="text-[17px] text-text/80 leading-[1.6] min-h-[50px] pr-4">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-[32px] flex items-baseline">
                                <span className="text-[64px] font-[800] text-text-dark leading-[1] tracking-[-0.03em]">{plan.price}</span>
                                <span className="text-[18px] text-text/80 font-[500] ml-2">{plan.period}</span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-[18px] mb-[40px] grow min-h-[220px]">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <FiCheckCircle className="h-[20px] w-[20px] text-primary shrink-0 fill-transparent stroke-[2.5]" />
                                        <span className="text-[15.5px] font-[500] text-text-dark tracking-[-0.01em]">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Call to Action Button */}
                            <Link href="/dashboard" className="block mt-auto">
                                <button
                                    className={`w-full flex items-center justify-center gap-2 h-[52px] rounded-lg font-[600] text-[16px] transition-colors group ${plan.popular
                                            ? "bg-secondary text-white hover:bg-secondary/90"
                                            : "bg-background text-text border border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {plan.cta}
                                    <FiArrowRight strokeWidth={2.5} className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
