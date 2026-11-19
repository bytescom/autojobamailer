"use client";
import React, { useState } from 'react';
import { FiX, FiAlertCircle, FiSend } from 'react-icons/fi';
import { useScrollLock } from "@/lib/useScrollLock";

const FollowUpLaunchModal = ({ steps, automationActive, onClose, onLaunch }) => {
    useScrollLock(true);
    const [launching, setLaunching] = useState(false);

    const handleLaunch = async () => {
        setLaunching(true);
        await new Promise(r => setTimeout(r, 1500));
        setLaunching(false);
        onLaunch();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-background rounded-2xl shadow-xl border border-border/50 w-full max-w-md mx-4 p-6 z-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[20px] font-bold text-text-dark tracking-tight">Review & Launch</h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface text-muted hover:text-text-dark transition-colors cursor-pointer">
                        <FiX size={18} />
                    </button>
                </div>
                <div className="bg-surface/60 border border-border/50 rounded-xl p-4 mb-5 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted">Automation Status</span>
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${automationActive ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                            {automationActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted">Total Steps</span>
                        <span className="text-[13px] font-bold text-text-dark">{steps.length + 1} Emails</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted">Target Audience</span>
                        <span className="text-[13px] font-bold text-text-dark">1,240 Leads</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[13px] font-medium text-muted">Daily Send Limit</span>
                        <span className="text-[13px] font-bold text-text-dark">50 / day</span>
                    </div>
                </div>
                <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl text-[12.5px] font-medium text-amber-800 flex items-start gap-2">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                    <p>Launching will begin sending emails immediately. This cannot be undone without pausing the campaign.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 bg-background border border-border text-text-dark rounded-xl text-[13.5px] font-semibold hover:bg-surface transition-colors cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleLaunch}
                        disabled={launching}
                        className="flex-1 py-2.5 bg-primary text-white rounded-xl text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition active:scale-[0.98] shadow-sm cursor-pointer disabled:opacity-60"
                    >
                        {launching ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><FiSend size={14} /> Launch Campaign</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FollowUpLaunchModal;
