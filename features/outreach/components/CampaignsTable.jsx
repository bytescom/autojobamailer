import React from 'react';
import { FiPlay, FiEdit2, FiCopy, FiTrash2, FiLoader } from 'react-icons/fi';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import { statusStyles, dotColors, formatDate, timeAgo } from './constants';

export default function CampaignsTable({
    campaigns,
    loading,
    sendingId,
    onLaunch,
    onEdit,
    onDuplicate,
    onDelete,
    onNew
}) {
    if (loading) {
        return <Spinner text="Loading campaigns..." />;
    }

    if (campaigns.length === 0) {
        return (
            <EmptyState
                label="No campaigns yet."
                onAction={onNew}
                actionLabel="+ New Campaign"
            />
        );
    }

    return (
        <div className="w-full min-w-[800px]">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface/95 backdrop-blur-sm z-10">
                    <tr>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60">
                            Campaign Name
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60">
                            Status
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60">
                            Created
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60 text-right">
                            Recipients
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60 text-center">
                            Progress
                        </th>
                        <th className="px-4 py-3 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-border/60 text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/40 bg-background">
                    {campaigns.map((campaign) => {
                        const progress = campaign.totalRecipients > 0
                            ? Math.round((campaign.sentCount / campaign.totalRecipients) * 100)
                            : 0;

                        return (
                            <tr key={campaign._id} className="group hover:bg-surface/50 transition-colors">
                                <td className="px-4 py-3.5">
                                    <p className="text-[14px] font-bold text-text-dark">{campaign.name}</p>
                                    <p className="text-[12px] text-muted font-medium mt-0.5">
                                        Updated {timeAgo(campaign.updatedAt)}
                                    </p>
                                </td>
                                <td className="px-4 py-3.5">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-[11px] font-bold ${
                                            statusStyles[campaign.status] || statusStyles['Draft']
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                dotColors[campaign.status] || 'bg-gray-500'
                                            }`}
                                        />
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3.5 text-[13px] font-medium text-text-dark">
                                    {formatDate(campaign.createdAt)}
                                </td>
                                <td className="px-4 py-3.5 text-[13px] font-bold text-text-dark text-right">
                                    {campaign.totalRecipients}
                                </td>
                                <td className="px-4 py-3.5">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-24 h-2 bg-surface border border-border/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <span className="text-[12px] font-bold text-muted w-8">
                                            {progress}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3.5 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        {campaign.status === 'Draft' && (
                                            <button
                                                onClick={() => onLaunch(campaign._id)}
                                                disabled={sendingId === campaign._id}
                                                className={`p-2 border rounded-md transition cursor-pointer ${
                                                    sendingId === campaign._id
                                                        ? 'text-green-600 bg-green-50 border-green-200 cursor-wait'
                                                        : 'text-muted hover:text-green-600 hover:bg-green-50 border-transparent hover:border-green-200'
                                                }`}
                                                title={sendingId === campaign._id ? 'Sending…' : 'Launch'}
                                            >
                                                {sendingId === campaign._id ? (
                                                    <FiLoader size={16} className="animate-spin" />
                                                ) : (
                                                    <FiPlay size={16} />
                                                )}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onEdit(campaign)}
                                            className="p-2 text-muted hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 rounded-md transition cursor-pointer"
                                            title="Edit"
                                        >
                                            <FiEdit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDuplicate(campaign)}
                                            className="p-2 text-muted hover:text-text-dark hover:bg-surface border border-transparent hover:border-border rounded-md transition cursor-pointer"
                                            title="Duplicate"
                                        >
                                            <FiCopy size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(campaign._id)}
                                            className="p-2 text-muted hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition cursor-pointer"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
