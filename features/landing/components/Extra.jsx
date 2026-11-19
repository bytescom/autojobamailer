import React from 'react';

const Extra = () => {
  return (
    <section className="w-full py-20 bg-surface/60 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-dark tracking-tight">
            See Your AI-Generated Job Email
          </h2>
          <p className="text-secondary font-semibold mt-2 text-base">
            Personalized. Human-like. Ready to send.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* Input Box */}
          <div className="p-6 sm:p-8 rounded-2xl border bg-white border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-text-dark">
                Input Details
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Your Profile & Target
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text/60">Target Role</p>
                <p className="text-base font-semibold text-text-dark mt-0.5">Frontend Developer Intern</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text/60">Target Company</p>
                <p className="text-base font-semibold text-text-dark mt-0.5">Razorpay</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text/60">Matched Skills</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {["React", "Tailwind CSS", "Node.js", "Next.js"].map((skill) => (
                    <span key={skill} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-text-dark border border-gray-200/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Output Email */}
          <div className="p-6 sm:p-8 rounded-2xl border bg-white border-primary/20 shadow-md shadow-primary/5 hover:shadow-lg transition-shadow relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />

            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-lg text-text-dark">
                  Generated Email
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Ready to send
                </span>
              </div>

              <div className="p-3 bg-gray-50/80 rounded-lg border border-gray-100 mb-4">
                <p className="text-xs font-bold text-text/60 uppercase tracking-wider">Subject</p>
                <p className="text-sm font-semibold text-text-dark mt-0.5">
                  Application for Frontend Developer Intern — Pankaj
                </p>
              </div>

              <div className="text-sm leading-relaxed text-text space-y-3 font-normal">
                <p>Hi Hiring Team,</p>
                <p>
                  I came across the Frontend Developer Intern role at Razorpay and was excited by the opportunity to contribute to your engineering team.
                </p>
                <p>
                  I have hands-on experience working with React, Tailwind CSS, and Node.js, building scalable and responsive web applications with strong performance standards.
                </p>
                <p>
                  I would love the chance to discuss how my skill set aligns with your current priorities at Razorpay.
                </p>
                <p>Looking forward to your response.</p>
                <div className="pt-2">
                  <p className="font-medium text-text-dark">Best regards,</p>
                  <p className="font-medium text-text-dark">[Your Name]</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Extra;
