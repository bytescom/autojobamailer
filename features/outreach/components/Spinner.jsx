import React from 'react';

export default function Spinner({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-3 text-muted">
            <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
            <p className="text-[13px] font-medium">{text}</p>
        </div>
    );
}
