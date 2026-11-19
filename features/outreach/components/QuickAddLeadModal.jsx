"use client";
import React, { useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useScrollLock } from "@/lib/useScrollLock";

const QuickAddLeadModal = ({ isOpen, onClose, onLeadAdded }) => {
    useScrollLock(isOpen);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !company.trim() || !role.trim()) {
            setError('Email, Company, and Role are required.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    company: company.trim(),
                    jobRole: role.trim(),
                    hrName: name.trim(),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to add contact.');
                setLoading(false);
                return;
            }
            onLeadAdded(data.contact);
            setName('');
            setEmail('');
            setCompany('');
            setRole('');
            onClose();
        } catch {
            setError('Network error. Failed to add contact.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-border/50 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px] font-bold text-text-dark">Quick Add Lead</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-surface rounded-lg text-muted hover:text-text-dark transition-colors cursor-pointer">
                        <FiX size={18} />
                    </button>
                </div>
                {error && (
                    <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[12px] font-bold flex items-center gap-1.5">
                        <FiAlertCircle size={14} /> {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">HR / Contact Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Saloni"
                            className="w-full px-3 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] outline-none focus:border-[#1f9160] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="saloni@cloudeagle.ai"
                            required
                            className="w-full px-3 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] outline-none focus:border-[#1f9160] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Company <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="CloudEagle.ai"
                            required
                            className="w-full px-3 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] outline-none focus:border-[#1f9160] transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1">Job Role <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Associate Product Manager"
                            required
                            className="w-full px-3 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] outline-none focus:border-[#1f9160] transition"
                        />
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-border text-text-dark rounded-lg text-[13px] font-bold hover:bg-surface cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[#1f9160] hover:bg-[#1a7a51] text-white rounded-lg text-[13px] font-bold cursor-pointer disabled:opacity-60"
                        >
                            {loading ? 'Adding...' : 'Add & Select'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuickAddLeadModal;
