// Template (not layout): remounts on every dashboard navigation, so each page
// fades in. Opacity-only — never add a transform here, it would break the
// position:fixed drawers/modals rendered inside these pages.
export default function DashboardTemplate({ children }) {
    return <div className="animate-page-transition">{children}</div>;
}
