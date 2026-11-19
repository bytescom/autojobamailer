"use client";
import React from 'react';
import { FiEdit2, FiMail, FiUsers, FiPaperclip, FiCheck, FiAlertCircle } from 'react-icons/fi';

const CampaignSummaryCard = ({
    campaignName,
    selectedTemplate,
    audienceCount,
    attachmentsCount,
    isGmailConnected = true,
    isReadyToLaunch,
    saving,
    onLaunch,
    onSaveDraft,
}) => {
    const validations = [
        { label: 'Campaign Named', ok: !!campaignName },
        { label: 'Gmail Connected', ok: isGmailConnected },
        { label: 'Template Selected', ok: !!selectedTemplate },
        { label: 'Audience Selected', ok: audienceCount > 0 },
    ];

    return (
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="sticky top-0 bg-white border border-border/60 rounded-[14px] shadow-sm flex flex-col p-5">
                <h3 className="text-[15px] font-bold text-text-dark mb-4 uppercase tracking-wider">Campaign Summary</h3>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5 text-muted"><FiEdit2 size={16} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Name</p>
                            <p className="text-[13px] font-bold text-text-dark mt-0.5">{campaignName || '—'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5 text-muted"><FiMail size={16} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Template</p>
                            <p className="text-[13px] font-bold text-text-dark mt-0.5">{selectedTemplate?.name || '—'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5 text-muted"><FiUsers size={16} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Audience</p>
                            <p className="text-[13px] font-bold text-text-dark mt-0.5">{audienceCount} contact{audienceCount !== 1 ? 's' : ''} selected</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-0.5 text-muted"><FiPaperclip size={16} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Attachments</p>
                            <p className="text-[13px] font-bold text-text-dark mt-0.5">{attachmentsCount > 0 ? `${attachmentsCount} file${attachmentsCount !== 1 ? 's' : ''}` : 'None'}</p>
                        </div>
                    </div>
                </div>

                {/* Validations */}
                <div className="bg-[#f9f9f9] border border-border/50 rounded-xl p-4 mb-6">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">Validation</p>
                    <div className="flex flex-col gap-2.5">
                        {validations.map(({ label, ok }) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${ok ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                                    {ok ? <FiCheck size={10} /> : <FiAlertCircle size={10} />}
                                </div>
                                <span className="text-[12.5px] font-semibold text-text-dark">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onLaunch}
                        disabled={!isReadyToLaunch || saving}
                        className="w-full py-3 bg-[#1a1a1a] text-white rounded-xl text-[14px] font-bold hover:bg-black transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <FiMail size={15} /> Launch Campaign
                    </button>
                    <button
                        type="button"
                        onClick={onSaveDraft}
                        disabled={saving}
                        className="w-full py-3 bg-white border border-border text-text-dark rounded-xl text-[14px] font-bold hover:bg-surface transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {saving ? (
                            <><div className="w-4 h-4 border-2 border-border border-t-text-dark rounded-full animate-spin" /> Saving...</>
                        ) : (
                            'Save Draft'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignSummaryCard;
