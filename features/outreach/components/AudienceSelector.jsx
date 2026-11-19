"use client";
import React from 'react';
import { FiUsers, FiPlus, FiSearch, FiChevronDown, FiCheck } from 'react-icons/fi';

const AudienceSelector = ({
    leads,
    leadsLoading,
    selectedLeadIds,
    toggleLead,
    toggleAll,
    allSelected,
    audienceTab,
    setAudienceTab,
    audienceSearch,
    setAudienceSearch,
    selectedRoleFilter,
    setSelectedRoleFilter,
    uniqueRoles,
    selectedTagFilter,
    setSelectedTagFilter,
    uniqueTags,
    onQuickAddClick,
    filteredLeads,
}) => {
    return (
        <section className="bg-white border border-border/60 rounded-[14px] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1f9160] text-white flex items-center justify-center shrink-0">
                        <FiUsers size={18} />
                    </div>
                    <div>
                        <h2 className="text-[18px] font-bold text-text-dark">3. Targeted Leads</h2>
                        <p className="text-[12px] font-medium text-muted">{selectedLeadIds.length} leads selected</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onQuickAddClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f9160] hover:bg-[#1a7a51] text-white rounded-lg text-[12px] font-bold transition-colors cursor-pointer shadow-sm shadow-[#1f9160]/10 font-sans"
                    >
                        <FiPlus size={14} /> QUICK ADD
                    </button>
                    <button
                        type="button"
                        onClick={toggleAll}
                        className="px-3 py-1.5 bg-white border border-border/60 text-text-dark rounded-lg text-[12px] font-bold hover:bg-[#f9f9f9] transition-colors cursor-pointer font-sans"
                    >
                        {allSelected ? 'DESELECT ALL' : 'SELECT ALL'}
                    </button>
                </div>
            </div>

            {/* Segmented controls / Tabs */}
            <div className="bg-[#f0f2f5] p-1 rounded-xl flex gap-1 mb-4">
                {[
                    { id: 'NOT_SENT', label: `NOT SENT (${leads.filter(l => l.status !== 'contacted').length})` },
                    { id: 'SENT', label: `SENT (${leads.filter(l => l.status === 'contacted').length})` },
                    { id: 'ALL', label: `ALL (${leads.length})` },
                ].map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setAudienceTab(tab.id)}
                        className={`flex-1 py-2 text-[12px] rounded-lg transition cursor-pointer text-center ${
                            audienceTab === tab.id
                                ? 'bg-white shadow text-[#1f9160] font-bold'
                                : 'text-muted hover:text-text-dark font-semibold'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={audienceSearch}
                        onChange={(e) => setAudienceSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] font-medium placeholder:text-muted outline-none focus:border-[#1f9160] focus:ring-2 focus:ring-[#1f9160]/10 transition"
                    />
                </div>
                
                {/* Role Filter dropdown */}
                <div className="relative shrink-0">
                    <select
                        value={selectedRoleFilter}
                        onChange={(e) => setSelectedRoleFilter(e.target.value)}
                        className="pl-3 pr-8 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] font-bold text-text-dark outline-none focus:border-[#1f9160] transition appearance-none cursor-pointer"
                    >
                        <option value="All Roles">All Roles</option>
                        {uniqueRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={14} />
                </div>

                {/* Tag Filter dropdown */}
                <div className="relative shrink-0">
                    <select
                        value={selectedTagFilter}
                        onChange={(e) => setSelectedTagFilter(e.target.value)}
                        className="pl-3 pr-8 py-2 bg-[#f9f9f9] border border-border/60 rounded-lg text-[13px] font-bold text-text-dark outline-none focus:border-[#1f9160] transition appearance-none cursor-pointer"
                    >
                        <option value="All Tags">All Tags</option>
                        {uniqueTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" size={14} />
                </div>
            </div>

            {/* Two-Column Grid Layout */}
            {leadsLoading ? (
                <div className="py-8 text-center text-muted text-[13px] font-medium flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-border border-t-[#1f9160] rounded-full animate-spin" />
                    Loading contacts...
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="py-8 text-center text-muted text-[13px] font-medium border border-dashed border-border/60 rounded-xl">
                    No contacts match filters.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                    {filteredLeads.map(lead => {
                        const strId = lead._id.toString();
                        const checked = selectedLeadIds.includes(strId);
                        return (
                            <div
                                key={lead._id}
                                onClick={() => toggleLead(lead._id)}
                                className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition ${
                                    checked
                                        ? 'border-[#1f9160] bg-[#1f9160]/5 shadow-sm'
                                        : 'border-border/60 bg-white hover:border-[#1f9160]/50'
                                }`}
                            >
                                {/* Checkbox indicator */}
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                                    checked
                                        ? 'border-[#1f9160] bg-[#1f9160] text-white'
                                        : 'border-border/80 bg-white'
                                }`}>
                                    {checked && <FiCheck size={12} />}
                                </div>

                                {/* Contact Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-bold text-text-dark truncate">
                                        {lead.email}
                                    </p>
                                    <p className="text-[12px] text-muted font-medium truncate mt-0.5">
                                        {lead.company ? `${lead.company} • ${lead.jobRole || 'HR'}` : lead.jobRole || lead.hrName || '—'}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default AudienceSelector;
