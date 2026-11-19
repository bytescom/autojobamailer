import React from 'react';
import { FiPlay } from 'react-icons/fi';

export default function EmptyState({ label, onAction, actionLabel, icon: Icon = FiPlay }) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[260px] gap-3 text-muted">
            <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
                <Icon size={20} className="text-muted" />
            </div>
            <p className="text-[14px] font-bold text-text-dark">{label}</p>
            {onAction && (
                <button
                    onClick={onAction}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-bold hover:bg-primary/90 transition active:scale-[0.98] cursor-pointer"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
