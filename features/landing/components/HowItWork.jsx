'use client';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { stepAnimation, steps, visualBgs, visuals, useInView } from './data/howItWorkData';

/* ── StepRow: own component so useInView hook is called at top-level (Rules of Hooks) ── */
function StepRow({ step, index }) {
    const [ref, inView] = useInView(0.18);
    const isEven        = index % 2 !== 0;
    const Visual        = visuals[index];
    const bg            = visualBgs[index];

    return (
        <div ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 lg:gap-10 group"
            style={stepAnimation.fadeInUp(inView, '0s', '40px')}
        >
            {/* ── Text col ── */}
            <div className={`flex flex-col justify-center py-6 md:py-10 px-2 md:px-8 lg:px-12 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-extrabold tracking-[0.15em] mb-5 uppercase"
                    style={stepAnimation.slideInX(inView, '0.1s')}>
                    <span className="w-1.5 h-1.5 rounded-md bg-primary" />
                    {step.step}
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-[2.1rem] font-extrabold text-text-dark mb-4 leading-tight tracking-tight"
                    style={stepAnimation.fadeInUp(inView, '0.2s', '15px')}>
                    {step.title}
                </h3>
                <div style={stepAnimation.fadeInUp(inView, '0.3s', '15px')}>
                    {Array.isArray(step.desc) ? (
                        <div className="text-base text-text/75 leading-[1.75] font-medium">
                            <div className="space-y-3 mb-4">
                                {step.desc.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                            {step.list && (
                                <ul className="space-y-2.5 mt-2">
                                    {step.list.map((li, i) => (
                                        <li key={i} className="flex items-center gap-3 text-text-dark font-semibold">
                                            <FiCheckCircle className="text-green-500 shrink-0" size={18} />
                                            <span>{li}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <p className="text-base text-text/75 leading-[1.75] font-medium">{step.desc}</p>
                    )}
                </div>
            </div>

            {/* ── Visual col ── */}
            <div className={`relative min-h-[340px] md:min-h-[400px] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${bg} rounded-xl overflow-hidden`}
                    style={stepAnimation.scaleIn(inView, '0.15s', 0.92, '0px')}>
                    <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 30% 20%, white 0%, transparent 60%)' }} />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>
                <div className="relative h-full">
                    <Visual started={inView} />
                </div>
            </div>
        </div>
    );
}

const HowItWork = () => {
    const [headerRef, headerInView] = useInView(0.2);

    return (
        <>
            <section className="py-14 sm:py-24 md:py-32 bg-background overflow-hidden relative" id="how-it-works">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 md:mb-28" style={stepAnimation.fadeInUp(headerInView)}>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-5 tracking-tight leading-tight">
                            Get Started in <span className="text-secondary">4 Simple Steps</span>
                        </h2>
                        <p className="text-lg text-text/75 font-medium leading-relaxed">
                            From profile setup to the automated job application email generator, streamline your job search in a few simple steps.
                        </p>
                    </div>

                    <div className="space-y-10 md:space-y-16 lg:space-y-20">
                        {steps.map((step, index) => (
                            <StepRow key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-20 md:py-32 bg-secondary/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/4 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-dark mb-5 tracking-tight leading-tight">
                            Built for <span className="text-primary">Different Job Search Needs</span>
                        </h2>
                        <p className="text-lg text-text/80 font-medium tracking-wide">
                            Who is Autojobmailer for? Basically, anyone who wants to land a job faster.
                        </p>
                    </div>
                    {/* Bento Box Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Students - Span 7 */}
                        <div className="md:col-span-7 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/30 border border-blue-200/50 overflow-hidden relative group p-8 lg:p-12 flex flex-col md:flex-row items-center gap-12 shadow-lg shadow-blue-900/10 hover:shadow-xl hover:shadow-blue-900/15 transition-all duration-500 hover:-translate-y-1">
                            <div className="z-10 flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-200/40 text-blue-800 text-xs font-bold tracking-wider mb-5 uppercase border border-blue-300/30">
                                    <span className="text-base">🎓</span> Students
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-text-dark mb-4 leading-snug">Applying for internships</h3>
                                <p className="text-text/80 leading-relaxed font-medium text-lg">Apply to internships and entry-level roles faster without manually rewriting your skills.</p>
                            </div>
                            <div className="w-full md:w-1/2 h-56 md:h-64 relative flex items-center justify-center shrink-0">
                                <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                                    <div className="w-56 bg-white rounded-xl shadow-2xl shadow-blue-600/20 border border-blue-200/40 p-5 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:-translate-y-3">
                                        <div className="w-full h-28 bg-gradient-to-br from-blue-100 to-blue-200/50 rounded-lg mb-5 flex items-center justify-center border border-blue-300/30">
                                            <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl">👤</div>
                                        </div>
                                        <div className="space-y-3 mb-5">
                                            <div className="w-4/5 h-3 bg-gray-300 rounded-full" />
                                            <div className="w-3/5 h-2.5 bg-gray-200 rounded-full" />
                                        </div>
                                        <div className="w-full h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md shadow-blue-600/30" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fresh Grads - Span 5 */}
                        <div className="md:col-span-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100/30 border border-orange-200/50 overflow-hidden relative group p-8 lg:p-10 flex flex-col items-start justify-between min-h-[380px] shadow-lg shadow-orange-900/10 hover:shadow-xl hover:shadow-orange-900/15 transition-all duration-500 hover:-translate-y-1">
                            <div className="z-10 w-full mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-orange-200/40 text-orange-800 text-xs font-bold tracking-wider mb-5 uppercase border border-orange-300/30">
                                    <span className="text-base">🧑‍🎓</span> Freshers
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-text-dark mb-4 leading-snug">Reaching out to companies</h3>
                                <p className="text-text/80 leading-relaxed font-medium text-lg">Send cold emails to hiring managers and recruiters seamlessly.</p>
                            </div>
                            <div className="w-full flex justify-end relative h-40 mt-auto">
                                <div className="absolute right-20 bottom-4 z-20">
                                    <div className="w-40 h-28 bg-white shadow-2xl shadow-orange-600/20 border border-orange-200/40 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-2">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-xl">✉️</div>
                                            <div className="w-20 h-1 bg-orange-300 rounded-full" />
                                            <div className="w-24 h-1 bg-orange-200 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-10 bottom-6 w-32 h-24 bg-white/70 shadow-lg shadow-orange-500/10 border border-orange-200/30 rounded-xl flex items-center justify-center transform -rotate-12 z-10 opacity-75">
                                    <div className="text-4xl">📧</div>
                                </div>
                            </div>
                        </div>

                        {/* Job Switchers - Span 5 */}
                        <div className="md:col-span-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100/30 border border-emerald-200/50 overflow-hidden relative group p-8 lg:p-10 flex flex-col items-start justify-between min-h-[380px] shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:shadow-emerald-900/15 transition-all duration-500 hover:-translate-y-1">
                            <div className="z-10 w-full mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-200/40 text-emerald-800 text-xs font-bold tracking-wider mb-5 uppercase border border-emerald-300/30">
                                    <span className="text-base">🔄</span> Job Switchers
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-text-dark mb-4 leading-snug">Applying to multiple roles efficiently</h3>
                                <p className="text-text/80 leading-relaxed font-medium text-lg">Reach dozens of companies without rewriting emails.</p>
                            </div>
                            <div className="w-full relative h-40 flex justify-center items-center mt-auto">
                                <div className="w-full max-w-[240px] flex flex-col gap-4 transition-transform duration-500 group-hover:-translate-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-lg shadow-emerald-600/20 border border-emerald-200/50 translate-x-6 relative z-20 transition-all duration-300 hover:scale-105">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 flex items-center justify-center flex-shrink-0">👤</div>
                                        <div className="flex-1 h-3 bg-gray-300 rounded-full" />
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 absolute -right-2.5 -top-2.5 border-2 border-white shadow-md" />
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white/80 rounded-xl shadow-md shadow-emerald-600/10 border border-emerald-100/40 opacity-75 relative z-10 translate-x-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">👤</div>
                                        <div className="flex-1 h-3 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Freelancers - Span 7 */}
                        <div className="md:col-span-7 rounded-xl bg-gradient-to-br from-fuchsia-50 to-purple-100/30 border border-fuchsia-200/50 overflow-hidden relative group p-8 lg:p-12 flex flex-col md:flex-row items-center gap-12 shadow-lg shadow-fuchsia-900/10 hover:shadow-xl hover:shadow-fuchsia-900/15 transition-all duration-500 hover:-translate-y-1">
                            <div className="w-full md:w-1/2 h-56 md:h-64 relative flex items-center justify-center shrink-0 order-2 md:order-1">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                    <div className="w-60 bg-white rounded-xl shadow-2xl shadow-fuchsia-600/20 border border-fuchsia-200/40 p-6 transition-all duration-500 group-hover:-rotate-2 group-hover:-translate-y-4 group-hover:scale-105">
                                        <div className="flex justify-between items-center border-b border-purple-100 pb-4 mb-5">
                                            <div className="w-1/2 h-4 bg-gray-300 rounded-full" />
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-100 to-purple-100 flex items-center justify-center text-lg">⚙️</div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="w-full h-12 bg-gradient-to-r from-fuchsia-50 to-purple-50 rounded-lg flex items-center justify-between px-4 border border-fuchsia-200/30">
                                                <div className="w-1/2 h-3 bg-fuchsia-200 rounded-full" />
                                                <div className="w-5 h-5 rounded-full bg-fuchsia-300" />
                                            </div>
                                            <div className="w-full h-12 bg-white border border-gray-200 rounded-lg flex items-center px-4">
                                                <div className="w-2/3 h-3 bg-gray-200 rounded-full" />
                                            </div>
                                            <div className="w-full h-12 bg-white border border-gray-200 rounded-lg flex items-center px-4">
                                                <div className="w-1/3 h-3 bg-gray-200 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="z-10 flex-1 order-1 md:order-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-fuchsia-200/40 text-fuchsia-800 text-xs font-bold tracking-wider mb-5 uppercase border border-fuchsia-300/30">
                                    <span className="text-base">💼</span> Freelancers
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-text-dark mb-4 leading-snug">Sending outreach emails</h3>
                                <p className="text-text/80 leading-relaxed font-medium text-lg">Send professional outreach emails to potential clients effortlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </>
    );
};

export default HowItWork;
