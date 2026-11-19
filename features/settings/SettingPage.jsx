"use client";
import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";

// Lazy load each tab — only downloads JS when user clicks
const ProfileTab = dynamic(() => import('@/features/settings/components/ProfileTab'));
const IntegrationsTab = dynamic(() => import('@/features/settings/components/IntegrationsTab'));
const AutomationTab = dynamic(() => import('@/features/settings/components/AutomationTab'));
const DangerZoneTab = dynamic(() => import('@/features/settings/components/DangerZoneTab'));

const tabs = ["Profile", "Integrations", "Automation", "Danger Zone"];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");

    const renderTab = () => {
        switch (activeTab) {
            case "Profile": return <ProfileTab />;
            case "Integrations": return <IntegrationsTab />;
            case "Automation": return <AutomationTab />;
            case "Danger Zone": return <DangerZoneTab />;
            default: return null;
        }
    };

    return (
        <div className="max-w-full h-full min-h-full overflow-x-hidden w-full pb-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 px-1 sm:px-0">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <h1 className="text-[28px] sm:text-[32px] font-extrabold text-text-dark leading-[1.1] tracking-tight">
                            Settings
                        </h1>
                        <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                            v3.3.1
                        </span>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-muted font-medium">Manage your account settings and preferences.</p>
                </div>
            </div>

            <section className="bg-background p-4 sm:p-6 rounded-xl border border-border/70 shadow-xs w-full max-w-full">
                {/* Tab Bar */}
                <div className="w-full bg-surface flex overflow-x-auto mb-6 sm:mb-8 border border-border/60 rounded-xl p-1 gap-1 max-w-full">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 text-[13px] font-bold rounded-lg transition whitespace-nowrap sm:flex-1 text-center cursor-pointer ${
                                activeTab === tab
                                    ? 'bg-background text-text-dark shadow-xs border border-border/40'
                                    : 'text-muted hover:text-text-dark hover:bg-background/50'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="w-full max-w-full">
                    <Suspense fallback={<Loading />}>
                        {renderTab()}
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
