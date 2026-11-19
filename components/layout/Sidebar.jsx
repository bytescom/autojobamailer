"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { FiGrid, FiBriefcase, FiFileText, FiUser, FiClock, FiSettings, FiCheckCircle, FiLogOut, FiChevronUp, FiMenu, FiX } from "react-icons/fi";
import { Playfair_Display } from "next/font/google";


const serif = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid size={20} strokeWidth={1.5} /> },
    { name: 'Leads', path: '/dashboard/leads', icon: <FiBriefcase size={20} strokeWidth={1.5} /> },
    { name: 'Outreach', path: '/dashboard/outreach', icon: <FiFileText size={20} strokeWidth={1.5} /> },
    { name: 'Follow Ups', path: '/dashboard/follow-up', icon: <FiUser size={20} strokeWidth={1.5} /> },
    { name: 'Tracking', path: '/dashboard/tracking', icon: <FiClock size={20} strokeWidth={1.5} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings size={20} strokeWidth={1.5} /> },
];

/**
 * UserAvatar — priority order:
 *  1. Google profile image (src prop)
 *  2. DiceBear "notionists-neutral" illustrated avatar (seeded from email)
 *  3. Gradient initials fallback
 */
function UserAvatar({ src, name, email, size = 40, className = "" }) {
    const [googleError, setGoogleError]   = useState(false);
    const [dicebearError, setDicebearError] = useState(false);

    const gradients = [
        "from-violet-500 to-indigo-500",
        "from-rose-500 to-pink-500",
        "from-amber-500 to-orange-500",
        "from-emerald-500 to-teal-500",
        "from-sky-500 to-blue-500",
        "from-fuchsia-500 to-purple-500",
    ];
    const gradientIndex = name ? name.charCodeAt(0) % gradients.length : 0;
    const gradient = gradients[gradientIndex];

    const initials = name
        ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    const seed = encodeURIComponent(email || name || "user");
    const dicebearUrl = `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,f0f0f0&backgroundType=gradientLinear&radius=50`;

    if (src && !googleError) {
        return (
            <Image
                src={src}
                alt={name || "User avatar"}
                width={size}
                height={size}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${className}`}
                onError={() => setGoogleError(true)}
            />
        );
    }

    if (!dicebearError) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={dicebearUrl}
                alt={name || "Generated avatar"}
                width={size}
                height={size}
                className={`w-full h-full object-cover ${className}`}
                onError={() => setDicebearError(true)}
            />
        );
    }

    return (
        <span className={`flex items-center justify-center w-full h-full text-white font-bold bg-gradient-to-br ${gradient} text-[13px] ${className}`}>
            {initials}
        </span>
    );
}

/* Perf note (the sidebar-lag fix):
   The <aside> ONLY ever transitions `width` (desktop) / `transform+opacity+visibility`
   (mobile drawer). Both content layouts (expanded grid + collapsed rail) stay mounted
   as fixed-width layers that cross-fade, so NOTHING reflows inside the sidebar while
   the width animates — the browser never re-lays-out text/cards mid-transition.
   Never replace the width-only transition with `transition` here. */

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const footerRef = useRef(null);
    const menuRef = useRef(null);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    const [popupStyle, setPopupStyle] = useState({});

    // Derive user info from session
    const userName = session?.user?.name || "User";
    const displayEmail = session?.user?.email || "";
    const avatarSrc = session?.user?.image || null;
    const firstName = userName.split(" ")[0];

    const open = isOpen || mobileOpen;

    useEffect(() => {
        const updatePosition = () => {
            if (profileOpen && footerRef.current) {
                const rect = footerRef.current.getBoundingClientRect();
                const width = isOpen ? rect.width : 256;
                setPopupStyle({
                    bottom: window.innerHeight - rect.top + 8,
                    // clamp inside the viewport — the mobile drawer sits at the right
                    // edge, so anchoring at the footer's left would push the popup off-screen
                    left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
                    width,
                });
            }
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [profileOpen, isOpen]);

    // NOTE: the popup is rendered through a portal (see below). The <aside> has
    // backdrop-filter, which makes it the containing block for position:fixed
    // children — without the portal, the viewport-based popup coordinates get
    // re-interpreted relative to the aside and the menu lands offset/off-screen.

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                profileOpen &&
                footerRef.current && !footerRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileOpen]);

    const handleSignOut = () => {
        setProfileOpen(false);
        signOut({ callbackUrl: "/login" });
    };

    return (
        <>
            {/* Mobile Topbar */}
            <div className="md:hidden flex items-center justify-between p-3 bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl shrink-0 w-full shadow-sm relative z-30">
                <Link href="/" className="flex items-center gap-3 group" aria-label="Autojobmailer">
                    <Image src="/icon.svg" alt="Autojobmailer Logo" width={28} height={28} className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
                    <h1 className="text-xl font-black tracking-tighter text-primary transition-colors">
                        Autojobmailer<span className="text-secondary">.</span>
                    </h1>
                </Link>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-1.5 rounded-lg text-text hover:bg-surface hover:text-primary transition active:scale-90 cursor-pointer"
                    aria-label="Open menu"
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Mobile Overlay — always mounted so it can fade */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden={!mobileOpen}
            />

            {/* Sidebar (Desktop or Mobile Drawer) — mobile drawer slides in from the
                RIGHT edge (next to the hamburger button) */}
            <aside className={`
                fixed inset-y-2 right-2 z-50 flex flex-col
                md:sticky md:top-2 md:right-auto md:translate-x-0 md:opacity-100 md:visible md:pointer-events-auto
                h-[calc(100dvh-16px)] md:h-[calc(100vh-16px)]
                shrink-0 bg-background/90 backdrop-blur-xl border border-border/50 shadow-sm rounded-xl overflow-visible
                transition-[width,translate,opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${open ? "w-72" : "w-72 md:w-16"}
                ${mobileOpen ? "translate-x-0 opacity-100 visible" : "translate-x-[110%] opacity-0 invisible pointer-events-none"}
            `}>
                {/* Layer container — both layouts stay mounted, cross-fade, never reflow */}
                <div className="relative flex-1 min-h-0">
                    {/* Expanded layer (also the mobile drawer content) */}
                    <div className={`absolute inset-y-0 left-0 w-72 flex flex-col transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <nav className="overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
                            <div className="p-5 border-b border-text/20 flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-3 group" aria-label="Autojobmailer">
                                    <Image src="/icon.svg" alt="Autojobmailer Logo" width={28} height={28} className="w-7 h-7 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
                                    <h1 className="text-xl font-black tracking-tighter text-primary transition-colors">
                                        Autojobmailer<span className="text-secondary">.</span>
                                    </h1>
                                </Link>

                                <div className="flex items-center gap-1">
                                    {/* Desktop Toggle Button */}
                                    <button onClick={toggleSidebar} aria-label="Collapse sidebar" className='hidden md:block cursor-pointer p-1.5 rounded-lg text-text hover:bg-surface hover:text-primary transition active:scale-90'>
                                        <LuPanelLeftClose size={22} />
                                    </button>

                                    {/* Mobile Close Button */}
                                    <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className='md:hidden cursor-pointer text-text hover:text-primary p-1.5 rounded-lg hover:bg-surface transition active:scale-90'>
                                        <FiX size={22} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 p-5">
                                <div className='flex gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300'>
                                    <h2 className={`text-xl leading-[1.2] text-text ${serif.className}`}>Welcome back,</h2>
                                    <h2 className={`text-xl leading-[1.2] font-semibold text-primary ${serif.className}`}>{firstName} :)</h2>
                                </div>

                                <div className='grid grid-cols-2 gap-2'>
                                    {navItems.filter(Boolean).map((item, i) => {
                                        if (!item?.path) return null;
                                        const isActive = item.path === '/dashboard'
                                            ? pathname === '/dashboard'
                                            : pathname?.startsWith(item.path);
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.path}
                                                onClick={() => setMobileOpen(false)}
                                                className={`cursor-pointer transition duration-200 border flex items-center justify-center rounded-xl shadow-sm min-h-[60px] w-full flex-col gap-1.5 px-2 py-3 hover:-translate-y-0.5 active:scale-[0.97] animate-in fade-in slide-in-from-bottom-1 fill-mode-backwards duration-300 ${
                                                    isActive
                                                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/25'
                                                        : 'bg-surface border-border text-text hover:bg-white hover:border-primary/40 hover:shadow-md'
                                                } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                                style={{ animationDelay: `${150 + i * 45}ms` }}
                                            >
                                                {React.cloneElement(item.icon, { className: `transition-transform duration-200 ${isActive ? 'text-white' : 'text-primary group-hover:scale-110'}` })}
                                                <span className={`text-[14px] leading-tight text-center w-full truncate ${serif.className} ${isActive ? 'text-white' : 'text-text'}`}>
                                                    {item.name}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* Collapsed rail layer (desktop only, icon-only) */}
                    <div className={`absolute inset-y-0 left-0 w-16 hidden md:flex flex-col items-center transition-opacity duration-200 ${!open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className="pt-5 pb-4 border-b border-text/20 w-full flex justify-center">
                            <button onClick={toggleSidebar} aria-label="Expand sidebar" className='cursor-pointer p-1.5 rounded-lg text-text hover:bg-surface hover:text-primary transition active:scale-90'>
                                <LuPanelRightClose size={22} />
                            </button>
                        </div>
                        <div className='flex flex-col gap-2 items-center py-5 px-2 w-full'>
                            {navItems.filter(Boolean).map((item, i) => {
                                if (!item?.path) return null;
                                const isActive = item.path === '/dashboard'
                                    ? pathname === '/dashboard'
                                    : pathname?.startsWith(item.path);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        title={item.name}
                                        className={`cursor-pointer transition duration-200 border flex items-center justify-center rounded-xl w-10 h-10 hover:scale-110 active:scale-95 ${
                                            isActive
                                                ? 'bg-primary border-primary text-white shadow-md shadow-primary/25'
                                                : 'bg-surface border-border text-text hover:bg-white hover:border-primary/40'
                                        } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    >
                                        {React.cloneElement(item.icon, { className: isActive ? 'text-white' : 'text-primary' })}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-text/20 relative shrink-0">
                    {/* Popup menu — portal: the aside's backdrop-filter makes it the
                        containing block for fixed children, which would offset the popup */}
                    {profileOpen && createPortal(
                        <>
                            <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={() => setProfileOpen(false)} />
                            <div ref={menuRef} className="fixed bg-background border border-border rounded-2xl shadow-xl overflow-hidden origin-bottom-left animate-in fade-in zoom-in-95 duration-200" style={{ ...popupStyle, zIndex: 9999 }}>
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-border bg-surface">
                                    <div className="w-11 h-11 rounded-xl overflow-hidden border border-border shrink-0">
                                        <UserAvatar src={avatarSrc} name={userName} email={displayEmail} size={44} />
                                    </div>
                                    <div className="min-w-0 pr-2">
                                        <p className="text-[14px] font-bold text-text-dark flex items-center gap-1 truncate">
                                            {userName} <FiCheckCircle className="text-primary shrink-0" size={12} />
                                        </p>
                                        <p className="text-[12px] text-text font-medium truncate">{displayEmail || "\u00A0"}</p>
                                    </div>
                                </div>
                                <div className="py-1.5">
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={() => setProfileOpen(false)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-semibold text-text hover:bg-surface hover:text-primary transition-colors"
                                    >
                                        <FiUser size={15} className="text-muted" /> Profile & Settings
                                    </Link>
                                    <div className="mx-4 my-1 border-t border-border" />
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <FiLogOut size={15} className="text-red-400" /> Sign out
                                    </button>
                                </div>
                            </div>
                        </>,
                        document.body
                    )}

                    {/* Footer button — avatar always visible, name/email cross-fade */}
                    <button
                        ref={footerRef}
                        onClick={() => setProfileOpen(prev => !prev)}
                        className={`relative w-full h-20 flex items-center justify-center rounded-b-xl cursor-pointer transition group active:scale-[0.98] ${profileOpen ? 'bg-surface' : 'hover:bg-surface'}`}
                    >
                        {/* Expanded variant */}
                        <span className={`absolute inset-y-0 left-0 w-72 flex items-center justify-between px-5 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <span className="flex items-center gap-3 min-w-0">
                                <span className="w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0 block">
                                    <UserAvatar src={avatarSrc} name={userName} email={displayEmail} size={40} />
                                </span>
                                <span className="flex flex-col items-start leading-tight min-w-0">
                                    <span className="text-[14px] font-semibold text-text-dark flex items-center gap-1 group-hover:text-primary transition-colors truncate max-w-full">
                                        <span className="truncate">{status === 'loading' ? '…' : firstName}</span>
                                        <FiCheckCircle className="text-primary w-3 h-3 shrink-0" />
                                    </span>
                                    <span className="text-xs text-text font-medium truncate max-w-full">{displayEmail}</span>
                                </span>
                            </span>
                            <span className={`shrink-0 rounded-full p-2 transition-colors ${profileOpen ? 'bg-primary/10' : 'bg-surface group-hover:bg-gray-200'}`}>
                                <FiChevronUp className={`h-4 w-4 text-text transition-transform duration-200 ${profileOpen ? 'rotate-0' : 'rotate-180'}`} />
                            </span>
                        </span>
                        {/* Collapsed variant (desktop rail) */}
                        <span className={`absolute inset-y-0 left-0 w-16 hidden md:flex items-center justify-center transition-opacity duration-200 ${!open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <span className="w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0 block">
                                <UserAvatar src={avatarSrc} name={userName} email={displayEmail} size={40} />
                            </span>
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}
