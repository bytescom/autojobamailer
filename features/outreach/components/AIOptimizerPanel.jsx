"use client";
import React, { useState } from 'react';
import { FiX, FiZap, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { useScrollLock } from "@/lib/useScrollLock";

const AIOptimizerPanel = ({ onClose, onApply }) => {
    useScrollLock(true);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const suggestions = [
        { label: 'Step 1 Wait Time', from: '3 Days', to: '2 Days', reason: 'Higher open rates on day 2 for your industry.' },
        { label: 'Step 2 Wait Time', from: '5 Days', to: '4 Days', reason: 'Engagement peaks at 4-day follow-up windows.' },
        { label: 'Step 3 Wait Time', from: '7 Days', to: '6 Days', reason: 'Wed morning sends yield 18% more replies.' },
    ];

    const handleApply = async () => {
        setApplying(true);
        await new Promise(r => setTimeout(r, 1200));
        onApply();
        setApplying(false);
        setApplied(true);
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full sm:w-[420px] h-full bg-background shadow-2xl border-l border-border/50 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-surface/30">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <FiZap size={16} />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-bold text-text-dark">AI Optimizer</h2>
                            <p className="text-[11px] font-medium text-muted">Powered by live performance data</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-border/50 text-muted hover:text-text-dark transition-colors cursor-pointer">
                        <FiX size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full border-4 border-primary/30 flex items-center justify-center shrink-0">
                            <span className="text-[20px] font-extrabold text-primary">78</span>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-0.5">Sequence Score</p>
                            <p className="text-[13px] font-medium text-text-dark">Good. 3 optimizations available — estimated <strong>+14%</strong> reply rate uplift.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">Suggested Changes</h3>
                        <div className="flex flex-col gap-3">
                            {suggestions.map((s, i) => (
                                <div key={i} className="p-4 bg-background border border-border/60 rounded-xl shadow-sm">
                                    <p className="text-[13px] font-bold text-text-dark mb-1.5">{s.label}</p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded text-[11px] font-bold">{s.from}</span>
                                        <span className="text-muted text-[12px]">to</span>
                                        <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[11px] font-bold">{s.to}</span>
                                    </div>
                                    <p className="text-[12px] text-muted font-medium">{s.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 bg-surface/60 border border-border/40 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <FiInfo size={13} className="text-primary shrink-0" />
                            <h3 className="text-[12px] font-bold text-text-dark">Why these suggestions?</h3>
                        </div>
                        <p className="text-[12px] text-muted font-medium leading-relaxed">Based on aggregate data from 12,000+ similar campaigns in the SaaS outreach category over the past 90 days.</p>
                    </div>
                </div>
                <div className="p-5 border-t border-border/50 bg-surface/30 flex gap-3 shrink-0">
                    <button onClick={onClose} className="flex-1 py-2.5 bg-background border border-border text-text-dark rounded-xl text-[13px] font-bold hover:bg-surface transition-colors cursor-pointer shadow-sm">
                        Dismiss
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={applying || applied}
                        className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition active:scale-[0.98] shadow-sm cursor-pointer disabled:opacity-60 ${applied ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'}`}
                    >
                        {applying ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : applied ? (
                            <><FiCheckCircle size={14} /> Applied!</>
                        ) : (
                            <><FiZap size={14} /> Apply All Changes</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIOptimizerPanel;
