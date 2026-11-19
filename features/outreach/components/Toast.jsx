"use client";
import React, { useEffect } from 'react';
import { FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', onDismiss }) => {
    useEffect(() => {
        const t = setTimeout(onDismiss, 3000);
        return () => clearTimeout(t);
    }, [onDismiss]);

    return (
        <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-[13px] font-semibold ${type === 'success' ? 'bg-background border-green-200 text-green-800' : 'bg-background border-amber-200 text-amber-800'}`}>
            {type === 'success' ? <FiCheckCircle size={15} className="text-green-500 shrink-0" /> : <FiInfo size={15} className="text-amber-500 shrink-0" />}
            {message}
            <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss"
                className="ml-2 -mr-1 p-1.5 rounded-lg text-muted hover:text-text-dark hover:bg-surface transition-colors active:scale-90 cursor-pointer"
            >
                <FiX size={16} />
            </button>
        </div>
    );
};

export default Toast;
