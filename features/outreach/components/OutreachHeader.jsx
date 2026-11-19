import React from 'react';
import { FiPlus } from 'react-icons/fi';

export default function OutreachHeader({
    activeTab,
    onTabChange,
    onNewCampaign,
    onNewTemplate
}) {
    return (
        <div className="flex flex-col gap-5 shrink-0 mb-6 mt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[28px] md:text-[32px] font-extrabold text-text-dark leading-[1.1] mb-1.5 tracking-tight">
                        Outreach
                    </h1>
                    <p className="text-[14px] font-medium text-muted">
                        Manage your email campaigns and outreach templates.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    {activeTab === 'Templates' ? (
                        <button
                            onClick={onNewTemplate}
                            className="flex items-center gap-2 px-4 py-2 bg-primary shadow-sm rounded-lg text-[13px] font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            <FiPlus size={14} /> New Template
                        </button>
                    ) : (
                        <button
                            onClick={onNewCampaign}
                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] shadow-sm rounded-lg text-[13px] font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                        >
                            <FiPlus size={15} /> New Campaign
                        </button>
                    )}
                </div>
            </div>

            {/* Main Tabs */}
            <div className="flex items-center gap-6 border-b border-border/60">
                {['Campaigns', 'Templates'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`pb-3 text-[14px] font-bold transition-colors relative cursor-pointer ${
                            activeTab === tab ? 'text-primary' : 'text-muted hover:text-text-dark'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
