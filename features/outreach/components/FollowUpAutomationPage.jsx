"use client";
import React, { useState } from 'react';
import {
    FiAlertCircle, FiClock, FiPlus,
    FiCheckCircle, FiZap, FiMail,
    FiChevronDown, FiSave, FiSend, FiInfo
} from 'react-icons/fi';
import TimelineStep from './TimelineStep';
import Toggle from './Toggle';
import Toast from './Toast';
import StepEditModal from './StepEditModal';
import FollowUpLaunchModal from './FollowUpLaunchModal';
import AIOptimizerPanel from './AIOptimizerPanel';

export default function FollowUpAutomationPage() {
    const [automationActive, setAutomationActive] = useState(true);
    const [defaultWaitTime, setDefaultWaitTime] = useState("2 Days");
    const [maxFollowups, setMaxFollowups] = useState("5");
    const [delayCalculation, setDelayCalculation] = useState("Calendar Days");
    const [steps, setSteps] = useState([
        { id: '1', waitTime: '3 Days', templateName: 'Follow-up: Soft Nudge', subject: "Re: Touching base regarding company scaling strategy" },
        { id: '2', waitTime: '5 Days', templateName: 'Follow-up: Resource Share', subject: "Thought you might find this industry report useful" },
        { id: '3', waitTime: '7 Days', templateName: 'Follow-up: Final Attempt', subject: "Is it still a priority? (Final follow-up)" },
    ]);
    const [rules, setRules] = useState({ stopAfterReply: true, stopIfMeetingBooked: true, stopOnBounce: true, stopIfManualNoteAdded: false });
    const [smartSending, setSmartSending] = useState({ businessHoursOnly: true, recipientTimezone: true });
    const [editingStep, setEditingStep] = useState(null);
    const [showLaunchModal, setShowLaunchModal] = useState(false);
    const [showAIOptimizer, setShowAIOptimizer] = useState(false);
    const [toast, setToast] = useState(null);
    const [launched, setLaunched] = useState(false);

    const showToast = (message, type = 'success') => setToast({ message, type });
    const toggleRule = (key) => setRules(prev => ({ ...prev, [key]: !prev[key] }));
    const toggleSmart = (key) => setSmartSending(prev => ({ ...prev, [key]: !prev[key] }));

    const handleMoveStep = (fromIndex, toIndex) => {
        const newSteps = [...steps];
        const [movedStep] = newSteps.splice(fromIndex, 1);
        newSteps.splice(toIndex, 0, movedStep);
        setSteps(newSteps);
    };
    const handleAddStep = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setSteps(prev => [...prev, { id: newId, waitTime: defaultWaitTime, templateName: 'New Follow-up Template', subject: 'Following up on my previous email' }]);
        showToast('New step added to sequence.');
    };
    const handleDuplicateStep = (id) => {
        const index = steps.findIndex(s => s.id === id);
        if (index > -1) {
            const stepToCopy = steps[index];
            const newSteps = [...steps];
            newSteps.splice(index + 1, 0, { ...stepToCopy, id: Math.random().toString(36).substr(2, 9), templateName: stepToCopy.templateName + ' (Copy)' });
            setSteps(newSteps);
            showToast('Step duplicated.');
        }
    };
    const handleDeleteStep = (id) => { setSteps(steps.filter(s => s.id !== id)); showToast('Step removed.', 'info'); };
    const handleEditStep = (id) => { const step = steps.find(s => s.id === id); if (step) setEditingStep(step); };
    const handleSaveStep = (id, updated) => { setSteps(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s)); showToast('Step saved.'); };
    const handleSaveDraft = () => showToast('Draft saved successfully.');
    const handleLaunched = () => { setLaunched(true); showToast('Campaign launched! Emails are queued for delivery.'); };
    const handleApplyAI = () => {
        setSteps(prev => prev.map((s, i) => { const w = ['2 Days', '4 Days', '6 Days']; return i < w.length ? { ...s, waitTime: w[i] } : s; }));
        showToast('AI optimizations applied.');
    };

    const totalDuration = steps.reduce((acc, s) => { const n = parseInt(s.waitTime) || 0; return acc + n * (s.waitTime.toLowerCase().includes('week') ? 7 : 1); }, 0);
    const allValid = steps.every(s => s.templateName && s.subject);

    return (
        <div className="relative flex flex-col h-auto min-h-full lg:h-full lg:min-h-0 w-full max-w-full overflow-x-hidden px-1 sm:px-2 pb-2">
            {editingStep && <StepEditModal step={editingStep} onClose={() => setEditingStep(null)} onSave={handleSaveStep} />}
            {showLaunchModal && <FollowUpLaunchModal steps={steps} automationActive={automationActive} onClose={() => setShowLaunchModal(false)} onLaunch={handleLaunched} />}
            {showAIOptimizer && <AIOptimizerPanel onClose={() => setShowAIOptimizer(false)} onApply={handleApplyAI} />}
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-2 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <div>
                        <h1 className="text-[24px] md:text-[28px] font-extrabold text-text-dark leading-[1.1] mb-0.5 tracking-tight">Follow-Up Automation</h1>
                        <p className="text-[13px] font-medium text-muted">Campaign: <span className="font-bold text-text-dark">Q4 Enterprise Outreach 2024</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                    <div className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12px] font-bold ${launched ? 'bg-green-50 border-green-200 text-green-700' : 'bg-surface border-border/50 text-muted'}`}>
                        <span className={`w-2 h-2 rounded-full ${launched ? 'bg-green-500 animate-pulse' : 'bg-border'}`} />
                        {launched ? 'Live' : 'Draft'}
                    </div>
                    <button onClick={handleSaveDraft} className="flex items-center gap-1.5 px-4 py-2 bg-background border border-border/60 shadow-sm rounded-lg text-[13px] font-bold text-text-dark hover:bg-surface transition-colors cursor-pointer">
                        <FiSave size={13} className="text-muted" /> Save Draft
                    </button>
                    <button onClick={() => setShowLaunchModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white shadow-sm rounded-lg text-[13px] font-bold hover:bg-primary/90 transition active:scale-[0.98] cursor-pointer">
                        <FiSend size={13} /> Review & Launch
                    </button>
                </div>
            </div>

            {/* Prototype notice */}
            <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-[13px] font-medium text-amber-800 flex items-center gap-2.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                Prototype preview — follow-up sequences, lead counts, and launching are not connected to the backend yet. Nothing you configure here sends emails.
            </div>

            {/* Main Grid */}
            <div className="flex flex-col lg:flex-row gap-6 lg:flex-1 lg:min-h-0 pb-10">
                {/* Left Column */}
                <div className="lg:flex-1 lg:overflow-y-auto flex flex-col gap-6 lg:pr-1 min-w-0">

                    {/* Strategy Configuration */}
                    <section className="bg-background border border-border/60 rounded-xl shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-[16px] font-bold text-text-dark mb-0.5">Strategy Configuration</h2>
                                <p className="text-[12.5px] text-muted font-medium">Define the global cadence and behavior of your follow-ups.</p>
                            </div>
                            <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full border shrink-0 transition-colors ${automationActive ? 'bg-primary/5 border-primary/20' : 'bg-surface border-border/50'}`}>
                                <span className={`text-[12px] font-bold transition-colors ${automationActive ? 'text-primary' : 'text-muted'}`}>Automation {automationActive ? 'Active' : 'Paused'}</span>
                                <Toggle checked={automationActive} onChange={() => setAutomationActive(v => !v)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-[12px] font-bold text-text-dark mb-1.5">Default Wait Time</label>
                                <select value={defaultWaitTime} onChange={e => setDefaultWaitTime(e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border/60 rounded-xl text-[13.5px] font-medium text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition cursor-pointer">
                                    <option>1 Day</option><option>2 Days</option><option>3 Days</option><option>5 Days</option><option>1 Week</option>
                                </select>
                                <p className="text-[11px] text-muted mt-1.5 font-medium">Applied to newly added steps</p>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-text-dark mb-1.5">Maximum Follow-ups</label>
                                <input type="number" value={maxFollowups} min="1" max="20" onChange={e => setMaxFollowups(e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border/60 rounded-xl text-[13.5px] font-medium text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition" />
                                <p className="text-[11px] text-muted mt-1.5 font-medium">Hard cap on steps per contact</p>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-text-dark mb-1.5">Delay Calculation</label>
                                <select value={delayCalculation} onChange={e => setDelayCalculation(e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border/60 rounded-xl text-[13.5px] font-medium text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition cursor-pointer">
                                    <option>Calendar Days</option><option>Business Days</option>
                                </select>
                                <p className="text-[11px] text-muted mt-1.5 font-medium">How intervals are measured</p>
                            </div>
                        </div>
                    </section>

                    {/* Sequence Timeline */}
                    <section className="bg-background border border-border/60 rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-[16px] font-bold text-text-dark mb-0.5">Sequence Timeline</h2>
                                <p className="text-[12.5px] text-muted font-medium">{steps.length + 1} emails &middot; ~{totalDuration} days total cadence</p>
                            </div>
                            <button onClick={handleAddStep} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-bold hover:bg-primary/90 transition active:scale-[0.98] shadow-sm cursor-pointer">
                                <FiPlus size={14} /> Add Step
                            </button>
                        </div>
                        <div className="pl-2 relative">
                            <div className="flex gap-4 mb-3">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm z-10 shrink-0"><FiMail size={14} /></div>
                                    <div className="w-px flex-1 bg-border/60 my-1 min-h-[40px]" />
                                </div>
                                <div className="flex-1 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4 mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[10.5px] font-extrabold text-primary uppercase tracking-wider mb-0.5">Initial Touchpoint</h3>
                                        <p className="text-[13px] text-text-dark font-bold truncate">Outreach: Enterprise Value Prop (Version A)</p>
                                    </div>
                                    <span className="px-3 py-1 bg-white border border-primary/20 rounded-full text-[11px] font-bold text-primary shrink-0">Primary Email</span>
                                </div>
                            </div>
                            {steps.map((step, index) => (
                                <TimelineStep key={step.id} step={step} index={index} isLast={index === steps.length - 1} moveStep={handleMoveStep} onEdit={handleEditStep} onDuplicate={handleDuplicateStep} onDelete={handleDeleteStep} />
                            ))}
                            <button onClick={handleAddStep} className="w-full mt-2 py-4 border-2 border-dashed border-border/60 rounded-xl flex items-center justify-center gap-2 text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition font-bold text-[13px] cursor-pointer">
                                <FiPlus size={14} /> Click to insert a new step
                            </button>
                        </div>
                    </section>

                    {/* Stop Rules + Smart Sending */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <section className="bg-background border border-border/60 rounded-xl shadow-sm p-6">
                            <h2 className="text-[16px] font-bold text-text-dark mb-0.5">Stop Rules</h2>
                            <p className="text-[12.5px] text-muted mb-5 font-medium">Conditions that auto-terminate the sequence.</p>
                            <div className="space-y-4">
                                {[
                                    { key: 'stopAfterReply', label: 'Stop after Reply', desc: 'Immediately halt on any reply' },
                                    { key: 'stopIfMeetingBooked', label: 'Stop if Meeting Booked', desc: 'Detect calendar invites' },
                                    { key: 'stopOnBounce', label: 'Stop on Bounce / Error', desc: 'Hard and soft bounces' },
                                    { key: 'stopIfManualNoteAdded', label: 'Stop if Note Added', desc: 'Manual intervention flag' },
                                ].map(({ key, label, desc }) => (
                                    <div key={key} className="flex items-center justify-between gap-3">
                                        <div className="min-w-0"><p className="text-[13px] font-semibold text-text-dark">{label}</p><p className="text-[11px] text-muted font-medium">{desc}</p></div>
                                        <Toggle checked={rules[key]} onChange={() => toggleRule(key)} size="sm" />
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="bg-background border border-border/60 rounded-xl shadow-sm p-6">
                            <h2 className="text-[16px] font-bold text-text-dark mb-0.5">Smart Sending</h2>
                            <p className="text-[12.5px] text-muted mb-5 font-medium">AI-driven delivery optimizations.</p>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><FiClock size={16} /></div>
                                        <div><p className="text-[13px] font-semibold text-text-dark">Business Hours Only</p><p className="text-[11px] text-muted font-medium">Send between 9 AM - 6 PM only</p></div>
                                    </div>
                                    <Toggle checked={smartSending.businessHoursOnly} onChange={() => toggleSmart('businessHoursOnly')} size="sm" />
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                        </div>
                                        <div><p className="text-[13px] font-semibold text-text-dark">Recipient Timezone</p><p className="text-[11px] text-muted font-medium">Adapt timing to the lead location</p></div>
                                    </div>
                                    <Toggle checked={smartSending.recipientTimezone} onChange={() => toggleSmart('recipientTimezone')} size="sm" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* AI Insights Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: <FiClock size={15} />, bg: 'bg-indigo-50 text-indigo-600', label: 'Wait Time Insight', text: '3-day intervals yield 22% higher reply rates for your industry segment.' },
                            { icon: <FiCheckCircle size={15} />, bg: 'bg-emerald-50 text-emerald-600', label: 'Spam Protection', text: 'Your sequence avoids common trigger words. Spam risk is low.' },
                            { icon: <FiAlertCircle size={15} />, bg: 'bg-orange-50 text-orange-500', label: 'Best Practice', text: 'Step 3 performs better when scheduled for Wednesday mornings.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-background border border-border/60 rounded-xl p-4 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>{item.icon}</div>
                                <div><h4 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">{item.label}</h4><p className="text-[12px] text-text-dark font-medium leading-relaxed">{item.text}</p></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-4">
                    <div className="sticky top-4 flex flex-col gap-4">
                        <div className="bg-background border border-border/60 rounded-xl shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-border/40 bg-surface/40">
                                <h2 className="text-[15px] font-bold text-text-dark">Campaign Summary</h2>
                                <p className="text-[12px] text-muted font-medium">Q4 Enterprise Outreach</p>
                            </div>
                            <div className="px-5 py-4 flex flex-col gap-3 border-b border-border/40">
                                <div className="flex justify-between items-center"><span className="text-[12.5px] font-medium text-muted">Status</span><span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${launched ? 'bg-green-100 text-green-700' : automationActive ? 'bg-indigo-50 text-primary' : 'bg-surface text-muted border border-border/50'}`}>{launched ? 'Live' : automationActive ? 'Active' : 'Paused'}</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12.5px] font-medium text-muted">Total Steps</span><span className="text-[13px] font-bold text-text-dark">{steps.length + 1} Emails</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12.5px] font-medium text-muted">Total Duration</span><span className="text-[13px] font-bold text-text-dark">~{totalDuration} days</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12.5px] font-medium text-muted">Target Leads</span><span className="text-[13px] font-bold text-text-dark">1,240</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12.5px] font-medium text-muted">Daily Limit</span><span className="text-[13px] font-bold text-text-dark">50 / day</span></div>
                            </div>
                            <div className="px-5 py-4">
                                <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-3">Validation Checklist</h4>
                                <div className="flex flex-col gap-2.5">
                                    {[
                                        { text: 'Campaign Configured', status: 'pass' },
                                        { text: `Templates Selected (${steps.length + 1}/${steps.length + 1})`, status: allValid ? 'pass' : 'warn' },
                                        { text: 'Automation Enabled', status: automationActive ? 'pass' : 'warn' },
                                        { text: 'Audience Assigned', status: 'pass' },
                                        { text: 'Sender Domain Verified', status: 'info' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {item.status === 'pass' ? <FiCheckCircle size={13} className="text-emerald-500 shrink-0" /> : item.status === 'warn' ? <FiAlertCircle size={13} className="text-amber-500 shrink-0" /> : <FiInfo size={13} className="text-muted shrink-0" />}
                                            <span className={`text-[12px] font-medium ${item.status === 'pass' ? 'text-text-dark' : item.status === 'warn' ? 'text-amber-700' : 'text-muted'}`}>{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 flex flex-col gap-2.5">
                                    <button onClick={() => setShowLaunchModal(true)} className="w-full py-2.5 bg-primary text-white rounded-xl text-[13.5px] font-bold hover:bg-primary/90 transition active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2">
                                        <FiSend size={14} /> Review & Launch
                                    </button>
                                    <button onClick={handleSaveDraft} className="w-full py-2 bg-transparent text-muted rounded-xl text-[13px] font-bold hover:text-text-dark transition-colors cursor-pointer">Save Draft</button>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setShowAIOptimizer(true)} className="w-full bg-background border border-border/60 rounded-xl p-4 shadow-sm flex items-start gap-3 hover:shadow-md hover:border-primary/30 transition cursor-pointer text-left group">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors"><FiZap size={16} /></div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-bold text-primary mb-0.5">AI Optimizer Available</h4>
                                <p className="text-[11.5px] text-muted font-medium leading-relaxed">Auto-adjust wait times using live performance data. Est. +14% reply rate.</p>
                            </div>
                            <FiChevronDown size={14} className="text-muted shrink-0 mt-0.5 -rotate-90 group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
