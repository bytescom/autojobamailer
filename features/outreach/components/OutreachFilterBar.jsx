import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const CAMPAIGN_STATUS_OPTIONS = ['All', 'Draft', 'Running', 'Scheduled', 'Completed', 'Failed'];
const TEMPLATE_CATEGORY_OPTIONS = ['All Templates', 'Cold Outreach', 'Follow-up', 'Newsletter', 'Transactional', 'Event Invite'];

export default function OutreachFilterBar({
    activeTab,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    templateCategory,
    onTemplateCategoryChange
}) {
    return (
        <div className="w-full p-3 border-b border-border/40 flex flex-col sm:flex-row items-center gap-3 shrink-0 bg-background">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={15} />
                <input
                    type="text"
                    placeholder={activeTab === 'Campaigns' ? "Search campaigns..." : "Search templates..."}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-surface/50 border border-border/60 rounded-lg text-[13px] font-medium placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:bg-background transition"
                />
            </div>

            {/* Campaign Status Filters */}
            {activeTab === 'Campaigns' && (
                <div className="flex items-center bg-surface/60 p-1 rounded-lg border border-border/40 overflow-x-auto scrollbar-hide shrink-0">
                    {CAMPAIGN_STATUS_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => onStatusFilterChange(option)}
                            className={`px-3 py-1.5 text-[12px] font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                                statusFilter === option
                                    ? 'bg-background text-text-dark shadow-sm border border-border/50'
                                    : 'text-muted hover:text-text-dark hover:bg-black/5 border border-transparent'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {/* Template Category Filters */}
            {activeTab === 'Templates' && (
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide">
                    <div className="flex items-center bg-surface/60 p-1 rounded-lg border border-border/40 shrink-0">
                        {TEMPLATE_CATEGORY_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => onTemplateCategoryChange(option)}
                                className={`px-3 py-1.5 text-[12px] font-semibold rounded-md transition cursor-pointer whitespace-nowrap ${
                                    templateCategory === option
                                        ? 'bg-background text-primary shadow-sm border border-border/50'
                                        : 'text-muted hover:text-text-dark hover:bg-black/5 border border-transparent'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button
                        className="p-2 border border-border/60 rounded-lg bg-surface/50 hover:bg-surface text-muted hover:text-text-dark transition-colors cursor-pointer shrink-0"
                        title="Filter options"
                        aria-label="Filter options"
                    >
                        <FiFilter size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}
