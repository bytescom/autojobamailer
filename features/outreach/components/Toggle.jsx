"use client";
import React from 'react';

const Toggle = ({ checked, onChange, size = 'md' }) => {
    const w = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6';
    const dot = size === 'sm' ? 'w-3.5 h-3.5 top-[3px] left-[3px]' : 'w-4 h-4 top-1 left-1';
    const trans = size === 'sm' ? 'translate-x-4' : 'translate-x-5';
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative ${w} rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${checked ? 'bg-primary' : 'bg-border'}`}
            role="switch"
            aria-checked={checked}
        >
            <span className={`absolute ${dot} bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? trans : 'translate-x-0'}`} />
        </button>
    );
};

export default Toggle;
