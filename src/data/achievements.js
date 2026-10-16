// Figures counted on 16 October 2026 from pull requests authored by Muhammed Mubashir
// in the company repositories enkeit/eposmob, enkeit/cloudposcom, enkeit/connect-app,
// enkeit/web-juiceworld, ganvin-enke/ganvin-app, and ganvin-enke/ganvin-app-exe.
// Refresh with: gh pr list --repo <owner/repo> --author @me --state merged --limit 200
export const metricsAsOf = "October 2026"

export const metrics = [
  {
    id: "pull-requests",
    value: "71",
    label: "merged pull requests",
    detail: "Contributed across six company repositories since April 2026.",
    projectId: 5,
  },
  {
    id: "apps",
    value: "6",
    label: "production applications",
    detail: "Flutter, React Native, and Next.js products currently serving customers.",
    projectId: 5,
  },
  {
    id: "screens",
    value: "25+",
    label: "POS screens consolidated",
    detail: "Listing and reporting screens migrated to a shared interface with Excel export in EPOSMOB.",
    projectId: 5,
  },
  {
    id: "languages",
    value: "3",
    label: "interface languages",
    detail: "English, Arabic, and Malayalam, with right-to-left layout support.",
    projectId: 5,
  },
  {
    id: "payments",
    value: "2",
    label: "payment gateways",
    detail: "Stripe and Razorpay checkout integrated across web storefronts and mobile apps.",
    projectId: 1,
  },
  {
    id: "requests",
    value: "67%",
    label: "fewer order-history requests",
    detail: "The Ganvin Customer order history now loads with two API calls instead of six.",
    projectId: 6,
  },
]
