"use client";
import React, { useState, useEffect } from 'react';
import {
    FiArrowLeft, FiMail,
    FiSettings, FiAlertCircle, FiPlus, FiX
} from 'react-icons/fi';
import TemplateEditorModal from './TemplateEditorModal';
import LaunchConfirmationModal from './LaunchConfirmationModal';
import QuickAddLeadModal from './QuickAddLeadModal';
import CampaignSummaryCard from './CampaignSummaryCard';
import AudienceSelector from './AudienceSelector';
import CampaignAttachments from './CampaignAttachments';
import Toggle from './Toggle';
import { useScrollLock } from "@/lib/useScrollLock";

const CampaignBuilder = ({ onClose, initialData }) => {
    const isEditing = !!initialData;

    // ── Form State ─────────────────────────────────────────────────────────
    const [campaignName, setCampaignName] = useState(initialData?.name || '');
    const [senderEmail, setSenderEmail] = useState(initialData?.senderEmail || '');

    // Email Template
    const [selectedTemplate, setSelectedTemplate] = useState(initialData?.templateSnapshot?.name ? initialData.templateSnapshot : null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

    // Attachments
    const [attachments, setAttachments] = useState(initialData?.attachments || []);

    // Audience
    const [leads, setLeads] = useState([]);
    const [leadsLoading, setLeadsLoading] = useState(true);
    const [selectedLeadIds, setSelectedLeadIds] = useState(
        (initialData?.audienceIds || []).map(id => id.toString())
    );
    const [audienceSearch, setAudienceSearch] = useState('');
    const [audienceTab, setAudienceTab] = useState('NOT_SENT'); // 'NOT_SENT', 'SENT', 'ALL'
    const [selectedRoleFilter, setSelectedRoleFilter] = useState('All Roles');
    const [selectedTagFilter, setSelectedTagFilter] = useState('All Tags');
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

    // Settings
    const [trackOpens, setTrackOpens] = useState(initialData?.trackOpens ?? true);
    const [trackReplies, setTrackReplies] = useState(initialData?.trackReplies ?? true);
    const [stopAfterReply, setStopAfterReply] = useState(initialData?.stopAfterReply ?? true);

    // UI
    const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // ── Fetch real leads ───────────────────────────────────────────────────
    useScrollLock(isTemplateModalOpen || isLaunchModalOpen || isQuickAddOpen);

    useEffect(() => {
        const fetchLeads = async () => {
            setLeadsLoading(true);
            try {
                const res = await fetch('/api/leads');
                const data = await res.json();
                if (data.contacts) setLeads(data.contacts);
            } catch (e) {
                console.error('Failed to fetch leads', e);
            } finally {
                setLeadsLoading(false);
            }
        };
        fetchLeads();
    }, []);

    // ── Validations ────────────────────────────────────────────────────────
    const isGmailConnected = true;
    const isTemplateSelected = selectedTemplate !== null;
    const isAudienceSelected = selectedLeadIds.length > 0;
    const isReadyToLaunch = isGmailConnected && isTemplateSelected && isAudienceSelected && !!campaignName;

    // Convert kept File objects to base64 for the campaign payload.
    const attachmentsToPayload = () =>
        Promise.all(
            attachments.map(att => {
                if (!att.file) return { name: att.name, size: att.size, contentType: att.contentType, data: att.data };
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = String(reader.result).split(",")[1] || "";
                        resolve({ name: att.name, size: att.size, contentType: att.contentType, data: base64 });
                    };
                    reader.onerror = () => reject(new Error(`Could not read ${att.name}`));
                    reader.readAsDataURL(att.file);
                });
            })
        );

    // ── Save Campaign (Draft or Launch) ───────────────────────────────────
    const saveCampaign = async (status = 'Draft') => {
        if (!campaignName.trim()) { setError('Campaign name is required.'); return null; }
        setSaving(true);
        setError('');
        try {
            let attachmentPayload = [];
            if (attachments.length) {
                attachmentPayload = await attachmentsToPayload();
                const totalBytes = attachmentPayload.reduce((sum, a) => sum + Math.ceil((a.data || "").length * 0.75), 0);
                if (totalBytes > 4 * 1024 * 1024) {
                    setError('Attachments are too large — keep the total under 4 MB.');
                    return null;
                }
            }
            const payload = {
                name: campaignName,
                senderEmail,
                templateId: selectedTemplate?._id || null,
                templateSnapshot: selectedTemplate ? { name: selectedTemplate.name, subject: selectedTemplate.subject, body: selectedTemplate.content || selectedTemplate.body || '' } : {},
                audienceIds: selectedLeadIds,
                attachments: attachmentPayload,
                trackOpens,
                trackReplies,
                stopAfterReply,
                status,
            };

            const url = isEditing ? `/api/outreach/campaigns/${initialData._id}` : '/api/outreach/campaigns';
            const method = isEditing ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Something went wrong.'); return null; }
            return data.campaign;
        } catch (e) {
            setError('Network error. Please try again.');
            return null;
        } finally {
            setSaving(false);
        }
    };

    const handleSaveDraft = async () => {
        const campaign = await saveCampaign('Draft');
        if (campaign) onClose();
    };

    const handleConfirmLaunch = async () => {
        const campaign = await saveCampaign('Draft');
        if (!campaign) return;

        setIsLaunchModalOpen(false);
        setSaving(true);
        setError('');

        try {
            let status = 'Running';
            let lastError = null;
            for (let attempt = 0; attempt < 40 && status === 'Running'; attempt++) {
                const res = await fetch(`/api/outreach/campaigns/${campaign._id}/send`, { method: 'POST' });
                const data = await res.json();
                if (!res.ok) {
                    lastError = data.error || 'Failed to send campaign.';
                    break;
                }
                status = data.status;
            }
            if (status === 'Running') {
                setError(lastError || 'Sending is still in progress. You can relaunch this campaign to continue the remaining batch.');
                onClose();
                return;
            }
            if (lastError) {
                setError(lastError);
                return;
            }
            onClose();
        } catch {
            setError('Network error while sending campaign.');
        } finally {
            setSaving(false);
        }
    };

    // Dynamic lists for filters
    const uniqueRoles = [...new Set(leads.map(l => l.jobRole).filter(Boolean))];
    const uniqueTags = [...new Set(leads.flatMap(l => l.tags || []).filter(Boolean))];

    // Audience filter logic
    const filteredLeads = leads.filter(l => {
        if (audienceTab === 'NOT_SENT' && l.status === 'contacted') return false;
        if (audienceTab === 'SENT' && l.status !== 'contacted') return false;
        if (selectedRoleFilter !== 'All Roles' && l.jobRole !== selectedRoleFilter) return false;
        if (selectedTagFilter !== 'All Tags' && !(l.tags || []).includes(selectedTagFilter)) return false;

        const query = audienceSearch.toLowerCase();
        return (
            (l.hrName || '').toLowerCase().includes(query) ||
            (l.email || '').toLowerCase().includes(query) ||
            (l.company || '').toLowerCase().includes(query) ||
            (l.jobRole || '').toLowerCase().includes(query)
        );
    });

    const allSelected = filteredLeads.length > 0 && filteredLeads.every(l => selectedLeadIds.includes(l._id.toString()));

    const toggleAll = () => {
        const ids = filteredLeads.map(l => l._id.toString());
        if (allSelected) {
            setSelectedLeadIds(prev => prev.filter(id => !ids.includes(id)));
        } else {
            setSelectedLeadIds(prev => [...new Set([...prev, ...ids])]);
        }
    };

    const toggleLead = (id) => {
        const strId = id.toString();
        setSelectedLeadIds(prev => prev.includes(strId) ? prev.filter(i => i !== strId) : [...prev, strId]);
    };

    const handleLeadAdded = (newContact) => {
        setLeads(prev => [newContact, ...prev]);
        setSelectedLeadIds(prev => [...prev, newContact._id.toString()]);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] lg:h-full w-full min-h-0 bg-[#f9f9f9]">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0 mb-6 mt-2 px-2 sm:px-4">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 rounded-lg bg-white border border-border/60 hover:bg-surface text-text-dark shadow-sm transition-colors cursor-pointer">
                        <FiArrowLeft size={16} />
                    </button>
                    <div>
                        <div className="text-[12px] font-bold text-muted mb-0.5">Campaign Builder</div>
                        <h1 className="text-[20px] sm:text-[24px] font-extrabold text-text-dark leading-tight tracking-tight">
                            {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="mx-4 mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-[13px] font-semibold flex items-center gap-2 shrink-0">
                    <FiAlertCircle size={16} /> {error}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-6 px-2 sm:px-4 pb-4">
                {/* Left Column */}
                <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 flex flex-col gap-5 scrollbar-hide">
                    {/* Campaign Details */}
                    <section className="bg-white border border-border/60 rounded-[14px] shadow-sm p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center shrink-0">
                                <FiSettings size={14} />
                            </div>
                            <h2 className="text-[17px] font-bold text-text-dark">Campaign Details</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
                                    Campaign Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={campaignName}
                                    onChange={(e) => setCampaignName(e.target.value)}
                                    placeholder="e.g. Q3 SWE Outreach"
                                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-border/60 rounded-xl text-[14px] font-bold text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
                                    Sender Email
                                </label>
                                <input
                                    type="email"
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    placeholder="your@gmail.com"
                                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-border/60 rounded-xl text-[14px] font-bold text-text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Email Template */}
                    <section className="bg-white border border-border/60 rounded-[14px] shadow-sm p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center shrink-0">
                                    <FiMail size={14} />
                                </div>
                                <div>
                                    <h2 className="text-[17px] font-bold text-text-dark">Email Template</h2>
                                    <p className="text-[12px] font-medium text-muted">Select or create the template for this campaign</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setSelectedTemplate(null); setIsTemplateModalOpen(true); }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-[12px] font-bold text-text-dark hover:bg-surface transition-colors cursor-pointer shadow-sm"
                            >
                                <FiPlus size={12} /> New Template
                            </button>
                        </div>

                        {selectedTemplate ? (
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 relative group">
                                <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => setIsTemplateModalOpen(true)}
                                        className="px-3 py-1 bg-white border border-border rounded-md text-[12px] font-bold text-text-dark shadow-sm hover:bg-surface cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTemplate(null)}
                                        className="p-1 bg-white border border-border rounded-md text-muted shadow-sm hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                    >
                                        <FiX size={12} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <h3 className="text-[14px] font-bold text-primary">{selectedTemplate.name}</h3>
                                </div>
                                <p className="text-[13px] font-medium text-text-dark">Subject: {selectedTemplate.subject}</p>
                                {selectedTemplate.content && (
                                    <p className="text-[12px] text-muted mt-2 line-clamp-2">{selectedTemplate.content}</p>
                                )}
                            </div>
                        ) : (
                            <div
                                className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#f9f9f9] transition-colors"
                                onClick={() => setIsTemplateModalOpen(true)}
                            >
                                <FiMail size={24} className="text-muted mb-2" />
                                <p className="text-[14px] font-bold text-text-dark mb-1">No Template Selected</p>
                                <p className="text-[12px] text-muted font-medium">Click to create or select an email template</p>
                            </div>
                        )}
                    </section>

                    {/* Attachments Section */}
                    <CampaignAttachments
                        attachments={attachments}
                        setAttachments={setAttachments}
                    />

                    {/* Targeted Leads Section */}
                    <AudienceSelector
                        leads={leads}
                        leadsLoading={leadsLoading}
                        selectedLeadIds={selectedLeadIds}
                        toggleLead={toggleLead}
                        toggleAll={toggleAll}
                        allSelected={allSelected}
                        audienceTab={audienceTab}
                        setAudienceTab={setAudienceTab}
                        audienceSearch={audienceSearch}
                        setAudienceSearch={setAudienceSearch}
                        selectedRoleFilter={selectedRoleFilter}
                        setSelectedRoleFilter={setSelectedRoleFilter}
                        uniqueRoles={uniqueRoles}
                        selectedTagFilter={selectedTagFilter}
                        setSelectedTagFilter={setSelectedTagFilter}
                        uniqueTags={uniqueTags}
                        onQuickAddClick={() => setIsQuickAddOpen(true)}
                        filteredLeads={filteredLeads}
                    />

                    {/* Campaign Settings */}
                    <section className="bg-white border border-border/60 rounded-[14px] shadow-sm p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center shrink-0">
                                <FiSettings size={14} />
                            </div>
                            <h2 className="text-[17px] font-bold text-text-dark">Campaign Settings</h2>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Track Opens', value: trackOpens, set: setTrackOpens },
                                { label: 'Track Replies', value: trackReplies, set: setTrackReplies },
                                { label: 'Stop sending after first reply', value: stopAfterReply, set: setStopAfterReply },
                            ].map(({ label, value, set }) => (
                                <div key={label} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                                    <span className="text-[14px] font-semibold text-text-dark">{label}</span>
                                    <Toggle checked={value} onChange={() => set(!value)} size="sm" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column — Summary Card */}
                <CampaignSummaryCard
                    campaignName={campaignName}
                    selectedTemplate={selectedTemplate}
                    audienceCount={selectedLeadIds.length}
                    attachmentsCount={attachments.length}
                    isGmailConnected={isGmailConnected}
                    isReadyToLaunch={isReadyToLaunch}
                    saving={saving}
                    onLaunch={() => setIsLaunchModalOpen(true)}
                    onSaveDraft={handleSaveDraft}
                />
            </div>

            {isTemplateModalOpen && (
                <TemplateEditorModal
                    onClose={() => setIsTemplateModalOpen(false)}
                    onSave={(t) => { setSelectedTemplate(t); setIsTemplateModalOpen(false); }}
                    initialData={selectedTemplate}
                    saveToDb={true}
                />
            )}

            {isLaunchModalOpen && (
                <LaunchConfirmationModal
                    onClose={() => setIsLaunchModalOpen(false)}
                    onConfirm={handleConfirmLaunch}
                    campaignName={campaignName}
                    audienceCount={selectedLeadIds.length}
                />
            )}

            <QuickAddLeadModal
                isOpen={isQuickAddOpen}
                onClose={() => setIsQuickAddOpen(false)}
                onLeadAdded={handleLeadAdded}
            />
        </div>
    );
};

export default CampaignBuilder;
