import React from "react";
import { 
    FiMail, 
    FiShield, 
    FiBarChart2, 
    FiCopy, 
    FiDatabase,  
    FiCheckSquare,
    FiZap
} from "react-icons/fi";

const featuresData = [
    {
        icon: FiZap,
        title: "Lightning Fast Generation",
        desc: "AI writes highly professional, personalized job application emails instantly using your stored profile.",
        span: "md:col-span-3 h-[420px]",
        customContent: (
            <div className="w-full max-w-sm flex-1 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">H</div>
                    <div className="text-sm text-gray-500 flex-1">To: <span className="text-gray-900 font-medium font-sans">hiring@stripe.com</span></div>
                    <div className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 font-medium ml-auto">AI drafted</div>
                </div>
                <div className="flex-1 p-4 bg-white border border-gray-100 rounded-xl shadow-sm relative overflow-hidden flex flex-col">
                    <div className="text-sm text-gray-500 leading-relaxed font-sans text-left">
                        Dear Hiring Team,<br/><br/>I am writing to express my interest in the <span className="text-blue-600 font-medium">Senior Frontend Engineer</span> role at <span className="text-blue-600 font-medium">Stripe</span>...<span className="inline-block w-[2px] h-4 bg-blue-500 ml-[2px] animate-pulse align-middle"></span>
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="text-xs font-semibold text-blue-600 tracking-wide flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Ready to send
                        </div>
                        <div className="text-xs text-gray-400 font-medium">Generated in 0.38s</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: FiShield,
        title: "Secure Gmail Sync",
        desc: "Send applications directly through your own Gmail account with bank-tier security.",
        span: "md:col-span-3 h-[420px]",
        customContent: (
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-4 relative">
                <div className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-medium w-20 shrink-0 text-left">Encryption</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-full rounded-full"></div></div>
                        <span className="text-xs text-blue-600 font-mono font-medium w-16 text-right">256-bit</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-medium w-20 shrink-0 text-left">Auth token</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-full rounded-full"></div></div>
                        <span className="text-xs text-indigo-600 font-mono font-medium w-16 text-right">OAuth2</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-medium w-20 shrink-0 text-left">Storage</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-full rounded-full"></div></div>
                        <span className="text-xs text-emerald-600 font-mono font-medium w-16 text-right">Zero</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: FiBarChart2,
        title: "Visual Tracking",
        desc: "Track every application from sent to interview on a visual dashboard.",
        span: "md:col-span-2 h-[380px]",
        customContent: (
            <div className="w-full max-w-xs h-full flex flex-col justify-center gap-3">
                {[
                    { label: "Sent", p: "100%", c: "bg-emerald-100", bc: "bg-emerald-500", num: "24", tc:"text-emerald-700" },
                    { label: "Opened", p: "75%", c: "bg-emerald-50", bc: "bg-emerald-400", num: "18", tc:"text-emerald-600" },
                    { label: "Replied", p: "37.5%", c: "bg-gray-100", bc: "bg-emerald-300", num: "9", tc:"text-gray-600" }
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-full">
                        <span className={`text-xs font-medium w-14 shrink-0 text-left ${stat.tc}`}>{stat.label}</span>
                        <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${stat.bc} relative`} style={{ width: stat.p }}></div>
                        </div>
                        <span className={`text-xs font-bold w-6 text-right ${stat.tc}`}>{stat.num}</span>
                    </div>
                ))}
            </div>
        )
    },
    {
        icon: FiDatabase,
        title: "Auto-Fill Profile",
        desc: "Store your skills and experience. Auto-fills perfectly.",
        span: "md:col-span-2 h-[380px]",
        customContent: (
            <div className="w-full h-full flex flex-col justify-center items-center relative">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full max-w-[220px] flex flex-col gap-3">
                    {["Resume Details", "Role Preferences", "Key Skills"].map((tag, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${i === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-transparent hover:bg-gray-100 transition-colors'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <span className={`text-xs font-medium ${i===0 ? 'text-blue-700' : 'text-gray-600'}`}>{tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        icon: FiCopy,
        title: "Smart Templates",
        desc: "Reuse and perfectly customize dynamic styling templates.",
        span: "md:col-span-2 h-[380px]",
        customContent: (
            <div className="w-full max-w-xs h-full flex flex-col justify-center gap-3">
                {["Tech startup", "Enterprise / FAANG", "Design Agency"].map((tpl, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${i === 0 ? "border-purple-200 bg-purple-50 shadow-sm" : "border-gray-100 bg-white shadow-sm"} transition-all cursor-pointer hover:border-purple-200`}>
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-purple-500" : "bg-gray-300"} shrink-0`}></div>
                        <span className={`text-sm font-medium ${i === 0 ? "text-purple-700" : "text-gray-600"}`}>{tpl}</span>
                        <span className={`ml-auto text-sm ${i === 0 ? "text-purple-500" : "text-gray-300"}`}>›</span>
                    </div>
                ))}
            </div>
        )
    }
];

const Features = () => {
    return (
        <section className="relative overflow-hidden bg-secondary/5 py-24 sm:py-32" id="features">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text mb-6 tracking-tight">
                        Everything you need to <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark animate-gradient">automate applications</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text/70 font-medium">
                        A powerful toolkit built to save you hours of mundane data entry. Stop writing emails from scratch.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8">
                    {featuresData.map((feature, index) => {
                        return (
                            <div
                                key={index}
                                className={`group rounded-xl bg-white border border-gray-100 p-2 flex flex-col overflow-hidden shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgb(0,0,0,0.06)] transition-all duration-300 ${feature.span}`}
                            >
                                <div className="flex-2 bg-[#F9F9FB] rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden border border-gray-50">
                                    {feature.customContent}
                                </div>
                                <div className="mt-auto px-6 py-4 text-center">
                                    <h3 className="text-[19px] font-bold text-gray-900 mb-2 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-gray-500 font-medium mx-auto max-w-6xl">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
