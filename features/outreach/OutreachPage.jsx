"use client"
import React, { useState, useEffect, useCallback } from 'react';
import CampaignBuilder from './components/CampaignBuilder';
import TemplateEditorModal from './components/TemplateEditorModal';
import OutreachHeader from './components/OutreachHeader';
import OutreachFilterBar from './components/OutreachFilterBar';
import CampaignsTable from './components/CampaignsTable';
import TemplatesGrid from './components/TemplatesGrid';

export default function OutreachPage() {
    const [activeTab, setActiveTab] = useState('Campaigns');
    const [isBuilding, setIsBuilding] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [templateCategory, setTemplateCategory] = useState('All Templates');
    const [sendingId, setSendingId] = useState(null);
    const [, setSendResult] = useState(null);

    // ── Campaign State ───────────────────────────────────────────────────────
    const [campaigns, setCampaigns] = useState([]);
    const [campaignsLoading, setCampaignsLoading] = useState(true);

    // ── Template State ───────────────────────────────────────────────────────
    const [templates, setTemplates] = useState([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);

    // ── Fetch Data ───────────────────────────────────────────────────────────
    const fetchCampaigns = useCallback(async () => {
        setCampaignsLoading(true);
        try {
            const res = await fetch('/api/outreach/campaigns');
            const data = await res.json();
            if (data.campaigns) setCampaigns(data.campaigns);
        } catch (e) {
            console.error('Failed to fetch campaigns', e);
        } finally {
            setCampaignsLoading(false);
        }
    }, []);

    const fetchTemplates = useCallback(async () => {
        setTemplatesLoading(true);
        try {
            const res = await fetch('/api/outreach/templates');
            const data = await res.json();
            if (data.templates) setTemplates(data.templates);
        } catch (e) {
            console.error('Failed to fetch templates', e);
        } finally {
            setTemplatesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    // ── Campaign Actions ─────────────────────────────────────────────────────
    const handleDeleteCampaign = async (id) => {
        if (!confirm('Delete this campaign? This cannot be undone.')) return;
        await fetch(`/api/outreach/campaigns/${id}`, { method: 'DELETE' });
        setCampaigns(prev => prev.filter(c => c._id !== id));
    };

    const handleDuplicateCampaign = async (campaign) => {
        const res = await fetch('/api/outreach/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `${campaign.name} (Copy)`,
                senderEmail: campaign.senderEmail,
                templateId: campaign.templateId,
                templateSnapshot: campaign.templateSnapshot,
                audienceIds: campaign.audienceIds,
                attachments: campaign.attachments,
                trackOpens: campaign.trackOpens,
                trackReplies: campaign.trackReplies,
                stopAfterReply: campaign.stopAfterReply,
                status: 'Draft',
            }),
        });
        const data = await res.json();
        if (data.campaign) setCampaigns(prev => [data.campaign, ...prev]);
    };

    const handleLaunchCampaign = async (id) => {
        if (!confirm('Launch this campaign? Emails will be sent immediately to all selected leads.')) return;
        setSendingId(id);
        setSendResult(null);
        try {
            const res = await fetch(`/api/outreach/campaigns/${id}/send`, { method: 'POST' });
            const data = await res.json();
            if (!res.ok) {
                alert(`Launch failed: ${data.error || 'Unknown error'}`);
                return;
            }
            setSendResult(data);
            await fetchCampaigns();
        } catch {
            alert('Network error while launching campaign.');
        } finally {
            setSendingId(null);
        }
    };

    // ── Template Actions ─────────────────────────────────────────────────────
    const handleDeleteTemplate = async (id) => {
        if (!confirm('Delete this template? This cannot be undone.')) return;
        await fetch(`/api/outreach/templates/${id}`, { method: 'DELETE' });
        setTemplates(prev => prev.filter(t => t._id !== id));
    };

    const handleSaveTemplate = async (templateData) => {
        if (editingTemplate) {
            const res = await fetch(`/api/outreach/templates/${editingTemplate._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(templateData),
            });
            const data = await res.json();
            if (data.template) {
                setTemplates(prev => prev.map(t => t._id === editingTemplate._id ? data.template : t));
            }
        } else {
            const res = await fetch('/api/outreach/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(templateData),
            });
            const data = await res.json();
            if (data.template) {
                setTemplates(prev => [data.template, ...prev]);
            }
        }
        setEditingTemplate(null);
        setIsTemplateModalOpen(false);
    };

    const openEditTemplate = (template) => {
        setEditingTemplate(template);
        setIsTemplateModalOpen(true);
    };

    const handleDuplicateTemplate = async (template) => {
        const res = await fetch('/api/outreach/templates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `${template.name} (Copy)`,
                subject: template.subject,
                body: template.body,
                category: template.category,
            }),
        });
        const data = await res.json();
        if (data.template) setTemplates(prev => [data.template, ...prev]);
    };

    const openNewTemplate = () => {
        setEditingTemplate(null);
        setIsTemplateModalOpen(true);
    };

    // ── Builder Handlers ─────────────────────────────────────────────────────
    const handleBuilderClose = () => {
        setIsBuilding(false);
        setEditingCampaign(null);
        fetchCampaigns();
    };

    // ── Filter Logic ─────────────────────────────────────────────────────────
    const filteredCampaigns = campaigns
        .filter(c => statusFilter === 'All' || c.status === statusFilter)
        .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredTemplates = templates
        .filter(t => templateCategory === 'All Templates' || t.category === templateCategory)
        .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (isBuilding) {
        return <CampaignBuilder onClose={handleBuilderClose} initialData={editingCampaign} />;
    }

    return (
        <div className="relative flex flex-col min-h-full h-full w-full max-w-full overflow-x-hidden px-1 sm:px-2 pb-2">
            {/* Header & Tabs */}
            <OutreachHeader
                activeTab={activeTab}
                onTabChange={(tab) => { setActiveTab(tab); setSearchQuery(''); }}
                onNewCampaign={() => setIsBuilding(true)}
                onNewTemplate={openNewTemplate}
            />

            <section className="flex-1 flex flex-col min-h-0 border border-border/60 bg-background shadow-sm rounded-xl max-w-full overflow-hidden">
                {/* Search & Filters */}
                <OutreachFilterBar
                    activeTab={activeTab}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    templateCategory={templateCategory}
                    onTemplateCategoryChange={setTemplateCategory}
                />

                {/* Content Area */}
                <div className="flex-1 overflow-auto bg-surface/10">
                    {activeTab === 'Campaigns' ? (
                        <CampaignsTable
                            campaigns={filteredCampaigns}
                            loading={campaignsLoading}
                            sendingId={sendingId}
                            onLaunch={handleLaunchCampaign}
                            onEdit={(campaign) => { setEditingCampaign(campaign); setIsBuilding(true); }}
                            onDuplicate={handleDuplicateCampaign}
                            onDelete={handleDeleteCampaign}
                            onNew={() => setIsBuilding(true)}
                        />
                    ) : (
                        <TemplatesGrid
                            templates={filteredTemplates}
                            loading={templatesLoading}
                            onEdit={openEditTemplate}
                            onDuplicate={handleDuplicateTemplate}
                            onDelete={handleDeleteTemplate}
                            onNew={openNewTemplate}
                        />
                    )}
                </div>
            </section>

            {isTemplateModalOpen && (
                <TemplateEditorModal
                    onClose={() => { setIsTemplateModalOpen(false); setEditingTemplate(null); }}
                    onSave={handleSaveTemplate}
                    initialData={editingTemplate}
                />
            )}
        </div>
    );
}
