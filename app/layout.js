import { manrope, playfair } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import AuthProvider from "@/lib/AuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Autojobmailer - AI Job Application Tool & Email Generator",
  description: "Automate job applications with Autojobmailer using our personalized AI job application email generator, smart follow-ups, and a built-in application tracker.",
  keywords: ["automate job applications", "AI job application tool", "job application email generator", "job application tracker", "auto apply to jobs"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AuthProvider>
          <ReduxProvider>
            {children}
            <Analytics />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: "var(--color-background, #fff)",
                  color: "var(--color-text-dark, #111)",
                  border: "1px solid var(--color-border, #e5e7eb)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "600",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
                  padding: "12px 16px",
                },
                success: {
                  iconTheme: { primary: "#10b981", secondary: "#fff" },
                },
                error: {
                  iconTheme: { primary: "#ef4444", secondary: "#fff" },
                },
              }}
            />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
