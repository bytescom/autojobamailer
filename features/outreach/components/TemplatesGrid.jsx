import React from 'react';
import { FiCopy, FiTrash2 } from 'react-icons/fi';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import { CARD_COLORS } from './constants';

export default function TemplatesGrid({
    templates,
    loading,
    onEdit,
    onDuplicate,
    onDelete,
    onNew
}) {
    if (loading) {
        return <Spinner text="Loading templates..." />;
    }

    if (templates.length === 0) {
        return (
            <EmptyState
                label="No templates yet."
                onAction={onNew}
                actionLabel="+ New Template"
            />
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template, idx) => (
                <div
                    key={template._id}
                    className="bg-background border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                    {/* Thumbnail */}
                    <div className={`h-40 w-full ${CARD_COLORS[idx % CARD_COLORS.length]} relative overflow-hidden flex items-center justify-center p-4`}>
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-text-dark shadow-sm">
                            {template.category}
                        </div>
                        <div className="w-24 h-32 bg-white rounded shadow-sm opacity-50 transform rotate-[-5deg]" />
                        <div className="w-24 h-32 bg-white rounded shadow-sm absolute opacity-70" />
                    </div>

                    <div className="p-4 flex flex-col gap-3 flex-1">
                        <h3 className="text-[15px] font-bold text-text-dark">{template.name}</h3>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => onEdit(template)}
                                className="flex-1 py-1.5 bg-primary text-white rounded-md text-[13px] font-bold hover:bg-primary/90 transition-colors cursor-pointer"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDuplicate(template)}
                                className="p-1.5 bg-background border border-border text-muted rounded-md hover:bg-surface hover:text-text-dark transition-colors cursor-pointer"
                                title="Duplicate"
                            >
                                <FiCopy size={14} />
                            </button>
                            <button
                                onClick={() => onDelete(template._id)}
                                className="p-1.5 bg-background border border-border text-muted rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                                title="Delete"
                            >
                                <FiTrash2 size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
