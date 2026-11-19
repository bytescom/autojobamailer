"use client";
import React, { useState } from 'react';
import { FiEdit2, FiX, FiSave } from 'react-icons/fi';
import { useScrollLock } from "@/lib/useScrollLock";

const StepEditModal = ({ step, onClose, onSave }) => {
    useScrollLock(true);
    const [waitTime, setWaitTime] = useState(step.waitTime || '3 Days');
    const [templateName, setTemplateName] = useState(step.templateName || '');
    const [subject, setSubject] = useState(step.subject || '');

    const handleSave = () => {
        onSave(step.id, { waitTime, templateName, subject });
        onClose();
    };

    const ic = "w-full px-4 py-2.5 bg-surface border border-border/60 rounded-xl text-[13.5px] font-medium text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition shadow-sm placeholder:text-muted";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-background rounded-2xl shadow-xl border border-border/50 w-full max-w-lg mx-4 p-6 z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <FiEdit2 size={16} />
                        </div>
                        <h3 className="text-[20px] font-bold text-text-dark tracking-tight">Edit Step</h3>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface text-muted hover:text-text-dark transition-colors cursor-pointer">
                        <FiX size={18} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[12px] font-bold text-text-dark mb-1.5 ml-1">Wait Time</label>
                        <select value={waitTime} onChange={e => setWaitTime(e.target.value)} className={`${ic} cursor-pointer`}>
                            <option>1 Day</option><option>2 Days</option><option>3 Days</option><option>5 Days</option><option>1 Week</option><option>2 Weeks</option>
                        </select>
                        <p className="text-[11px] text-muted mt-1.5 font-medium ml-1">Time to wait after the previous step</p>
                    </div>
                    <div>
                        <label className="block text-[12px] font-bold text-text-dark mb-1.5 ml-1">Email Template Name</label>
                        <input type="text" value={templateName} onChange={e => setTemplateName(e.target.value)} placeholder="e.g., Follow-up: Soft Nudge" className={ic} />
                    </div>
                    <div>
                        <label className="block text-[12px] font-bold text-text-dark mb-1.5 ml-1">Subject Line</label>
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g., Re: Touching base regarding company" className={ic} />
                        <p className="text-[11px] text-muted mt-1.5 font-medium ml-1">Use curly brace variables for personalization tokens</p>
                    </div>
                    <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-border/60">
                        <button onClick={onClose} className="px-5 py-2.5 bg-background border border-border text-text-dark rounded-xl text-[13.5px] font-semibold hover:bg-surface transition-colors cursor-pointer">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2.5 bg-primary text-white rounded-xl text-[13.5px] font-semibold flex items-center gap-2 hover:bg-primary/90 transition active:scale-[0.98] shadow-sm cursor-pointer">
                            <FiSave size={14} /> Save Step
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepEditModal;
