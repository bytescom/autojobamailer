"use client";
import React, { useRef } from 'react';
import { FiPaperclip, FiUpload, FiX } from 'react-icons/fi';

const CampaignAttachments = ({ attachments, setAttachments }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (files) => {
        const newFiles = Array.from(files).map(f => ({
            name: f.name,
            size: `${(f.size / 1024).toFixed(0)} KB`,
            contentType: f.type || "application/octet-stream",
            file: f,
        }));
        setAttachments(prev => [...prev, ...newFiles]);
    };

    return (
        <section className="bg-white border border-border/60 rounded-[14px] shadow-sm p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center shrink-0">
                    <FiPaperclip size={14} />
                </div>
                <h2 className="text-[17px] font-bold text-text-dark">
                    Attachments <span className="text-muted text-[12px] font-medium">(Optional)</span>
                </h2>
            </div>

            <div
                className="border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors mb-4 bg-[#f9f9f9] cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleFileSelect(e.dataTransfer.files);
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                    <FiUpload size={16} className="text-muted" />
                </div>
                <p className="text-[14px] font-bold text-text-dark mb-1">Drag & drop or click to upload</p>
                <p className="text-[12px] text-muted font-medium">PDF, DOC, DOCX — up to 10MB each</p>
            </div>

            {attachments.length > 0 && (
                <div className="flex flex-col gap-2">
                    {attachments.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-surface/30">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <FiPaperclip size={14} />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-text-dark">{file.name}</p>
                                    <p className="text-[11px] font-medium text-muted">{file.size}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAttachments(prev => prev.filter((_, fi) => fi !== i))}
                                className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CampaignAttachments;
