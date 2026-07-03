export const brand = {
  name: "AquaRosters",
  domain: "aquarosters.com",
  tagline: "Run your activity center from one live agenda.",
  description:
    "AquaRosters is the live operations agenda for dive centers and watersports schools: bookings, staff, gear, participants, POS, payments, trips, notifications, and reports in one place — with simple monthly pricing and 0% commission.",
  ctaPrimary: "Book a Demo",
  ctaSecondary: "Join Design Partner Program",
  ctaPricing: "See Pricing",
  appLoginUrl: "https://app.aquarosters.com/login",
};

export type NavLink = { label: string; href: string };

export const productLinks: NavLink[] = [
  { label: "All Features", href: "/features" },
  { label: "Live Agenda", href: "/features/live-agenda" },
  { label: "POS & Payments", href: "/features/pos-payments" },
  { label: "Gear & Rentals", href: "/features/gear-rentals" },
  { label: "Reports & Dashboard", href: "/features/reports-dashboard" },
];

export const solutionLinks: NavLink[] = [
  { label: "Dive Centers", href: "/solutions/dive-centers" },
  { label: "Kitesurf & Surf Schools", href: "/solutions/kitesurf-surf-schools" },
];

export const primaryNav = [
  { label: "Product", href: "/features", dropdown: productLinks },
  { label: "Solutions", href: "/solutions/dive-centers", dropdown: solutionLinks },
  { label: "Pricing", href: "/pricing" },
  { label: "Comparison", href: "/comparison" },
  { label: "Design Partners", href: "/design-partners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Live Agenda", href: "/features/live-agenda" },
      { label: "POS & Payments", href: "/features/pos-payments" },
      { label: "Gear & Rentals", href: "/features/gear-rentals" },
      { label: "Reports", href: "/features/reports-dashboard" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Dive Centers", href: "/solutions/dive-centers" },
      { label: "Kitesurf Schools", href: "/solutions/kitesurf-surf-schools" },
      { label: "Surf Schools", href: "/solutions/kitesurf-surf-schools" },
      { label: "Rental Operators", href: "/features/gear-rentals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Design Partners", href: "/design-partners" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export type FeatureModule = {
  slug: string;
  icon: string;
  title: string;
  eyebrow: string;
  oneLiner: string;
  h1: string;
  subheadline: string;
  problem: string;
  howItWorks: string[];
  benefits: string[];
  mockup: string;
};

export const featureModules: FeatureModule[] = [
  {
    slug: "live-agenda",
    icon: "calendar",
    title: "Live Agenda",
    eyebrow: "Plan the day",
    oneLiner: "See sessions, instructors, participants, gear, and changes in one operating view.",
    h1: "One live agenda for every session, instructor, participant, and resource.",
    subheadline:
      "See the whole operational day in one place — sessions, staff, participants, gear, trips, payments, reminders, and changes.",
    problem:
      "Spreadsheets and calendars show time slots, but they do not show the full operating picture.",
    howItWorks: [
      "View daily sessions by activity, staff, or trip.",
      "See participant counts and payment status.",
      "Check staff and gear availability.",
      "Move sessions when the plan changes.",
      "Keep every change visible to the team.",
    ],
    benefits: [
      "One source of truth",
      "Fewer missed updates",
      "Better staff coordination",
      "Faster daily decisions",
    ],
    mockup: "LiveAgendaMockup",
  },
  {
    slug: "smart-scheduling",
    icon: "shuffle",
    title: "Smart Scheduling",
    eyebrow: "Protect capacity",
    oneLiner: "Reschedule sessions, check instructor overlaps, and protect capacity.",
    h1: "Move the plan fast when weather, staff, or customers change.",
    subheadline:
      "Reschedule sessions, reassign instructors, transfer participants, and protect capacity from one workflow.",
    problem:
      "When conditions change, updating a session by hand across a calendar, a spreadsheet, and a group chat is slow and error-prone.",
    howItWorks: [
      "Drag-and-drop rescheduling across the agenda.",
      "Automatic instructor overlap checks before a move is confirmed.",
      "Lock sessions that should not be touched.",
      "Generate recurring sessions that stay individually editable.",
      "Keep every reschedule keyboard-accessible.",
    ],
    benefits: [
      "Fewer double-bookings",
      "Faster schedule changes",
      "Protected session capacity",
      "Accessible to every team member",
    ],
    mockup: "ReschedulingWorkflowMockup",
  },
  {
    slug: "tide-weather-context",
    icon: "waves",
    title: "Tide & Weather Context",
    eyebrow: "Built for watersports reality",
    oneLiner: "Plan marine sessions with tide and weather context visible in the agenda.",
    h1: "Plan sessions with tide and weather context built into the agenda.",
    subheadline:
      "Give watersports teams the marine context they need before moving sessions or confirming bookings.",
    problem:
      "Generic booking calendars have no idea what the tide or wind is doing — so teams check a separate app, then update the schedule by hand.",
    howItWorks: [
      "Tide curve overlay directly on the daily agenda.",
      "Weather availability shown alongside each session.",
      "Marine-aware planning for tide-relative activities.",
      "Graceful fallback state when external weather data is unavailable.",
      "Faster, better-informed schedule decisions.",
    ],
    benefits: [
      "One less tab to check",
      "Marine-aware scheduling",
      "Reliable even when weather APIs fail",
      "Faster go/no-go decisions",
    ],
    mockup: "LiveAgendaMockup",
  },
  {
    slug: "online-booking",
    icon: "globe",
    title: "Online Booking",
    eyebrow: "Sell directly",
    oneLiner: "Let customers book directly while sharing availability with POS.",
    h1: "Let customers book online without losing control of availability.",
    subheadline:
      "Direct online booking connected to the same availability your staff sees in POS and the live agenda.",
    problem:
      "Booking widgets that don't share availability with the front desk create double-bookings and manual reconciliation.",
    howItWorks: [
      "Public booking pages backed by live session availability.",
      "Shared inventory between online booking, POS, and the agenda.",
      "Basket expiry so abandoned checkouts release capacity.",
      "Promo codes and deposits at checkout.",
      "Buyer and participant captured separately at booking time.",
    ],
    benefits: [
      "No double-bookings",
      "Direct booking ownership",
      "0% commission on direct sales",
      "Cleaner buyer vs. participant data",
    ],
    mockup: "POSPaymentMockup",
  },
  {
    slug: "pos-payments",
    icon: "credit-card",
    title: "POS & Payments",
    eyebrow: "Sell and close the day",
    oneLiner: "Sell, book, take payment, track deposits, and close the register.",
    h1: "Sell, book, take payment, and close the register from one flow.",
    subheadline:
      "Connect front-desk sales, online bookings, deposits, invoices, payment links, and register closure.",
    problem:
      "Manual POS and separate payment tracking mean deposits, balances, and daily revenue are reconciled after the fact, by hand.",
    howItWorks: [
      "Staff POS for front-desk sales and bookings.",
      "Cash and card payments, invoices, and payment links.",
      "Deposit and balance tracking tied to each booking.",
      "Register open and close with a clear revenue summary.",
      "Live revenue visibility throughout the day.",
    ],
    benefits: [
      "Faster front-desk checkout",
      "Accurate deposit tracking",
      "Clean end-of-day register close",
      "Live revenue visibility",
    ],
    mockup: "POSPaymentMockup",
  },
  {
    slug: "customer-360",
    icon: "user",
    title: "Customer 360",
    eyebrow: "Know every participant",
    oneLiner: "Capture buyer and participant details, documents, notes, and certifications.",
    h1: "Capture the right details for every buyer and participant.",
    subheadline:
      "Track customer records, participant details, certifications, license numbers, documents, notes, and balances.",
    problem:
      "Paper forms capture customer data once and then disappear into a folder — nothing is searchable, and nothing carries forward to the next booking.",
    howItWorks: [
      "Central customer records shared across bookings.",
      "Participant-level details separate from the buyer.",
      "Date of birth, certification, and license number fields.",
      "Documents and staff notes attached to each record.",
      "Store credit and balance tracked per customer.",
    ],
    benefits: [
      "Searchable customer history",
      "Certification details on hand",
      "Fewer repeated intake forms",
      "Clear buyer vs. participant records",
    ],
    mockup: "TripManifestMockup",
  },
  {
    slug: "gear-rentals",
    icon: "package",
    title: "Gear & Rentals",
    eyebrow: "Know what's available",
    oneLiner: "Track gear units, rentals, maintenance, and trip assignments.",
    h1: "Know what gear is available, rented, blocked, or assigned to a trip.",
    subheadline:
      "Track individual gear units, rental blocks, maintenance checks, and trip assignments.",
    problem:
      "When gear availability lives in someone's memory, double-booked equipment and last-minute scrambles are routine.",
    howItWorks: [
      "Individual gear units tracked, not just categories.",
      "Rental agenda shared with the live schedule.",
      "Maintenance blocks that take a unit out of rotation.",
      "Automatic trip assignment for gear-heavy sessions.",
      "Double-booking prevention across bookings and trips.",
    ],
    benefits: [
      "No more gear surprises",
      "Maintenance tracked, not forgotten",
      "Fewer last-minute substitutions",
      "Gear tied directly to trips",
    ],
    mockup: "GearAvailabilityMockup",
  },
  {
    slug: "trips-manifests",
    icon: "ship",
    title: "Trips & Manifests",
    eyebrow: "Run the boat, not the paperwork",
    oneLiner: "Build clean trip manifests with participant and certification details.",
    h1: "Turn sessions into clean trip manifests.",
    subheadline:
      "Group sessions into trips and generate manifest views with participant, certification, gear, and payment details.",
    problem:
      "Building a boat manifest by hand from a spreadsheet and a stack of forms costs time every single day it happens.",
    howItWorks: [
      "Group related sessions into a single trip.",
      "Generate a manifest with full participant lists.",
      "Certification and license details included automatically.",
      "Gear assignments shown per participant.",
      "Print-ready manifest output for crew and compliance.",
    ],
    benefits: [
      "Manifests built in minutes, not hours",
      "Fewer manifest errors",
      "Certification checks built in",
      "Crew-ready print output",
    ],
    mockup: "TripManifestMockup",
  },
  {
    slug: "notifications",
    icon: "bell",
    title: "Notifications",
    eyebrow: "Keep everyone updated",
    oneLiner: "Send confirmations, reminders, cancellations, and payment updates.",
    h1: "Keep customers and staff updated when the plan changes.",
    subheadline:
      "Send booking confirmations, reminders, cancellations, payment receipts, and schedule updates by email or SMS.",
    problem:
      "WhatsApp works until a message gets missed, buried, or sent to the wrong group — and there's no record of what was actually sent.",
    howItWorks: [
      "Automatic booking confirmations and reminders.",
      "Cancellation and reschedule notices tied to the session.",
      "Payment receipts sent on confirmation.",
      "Email and SMS templates per notification type.",
      "Failure logging when a message doesn't go through.",
    ],
    benefits: [
      "Fewer missed updates",
      "Consistent customer communication",
      "A record of what was sent",
      "Less manual messaging",
    ],
    mockup: "ReschedulingWorkflowMockup",
  },
  {
    slug: "reports-dashboard",
    icon: "bar-chart",
    title: "Reports & Dashboard",
    eyebrow: "See the business, live",
    oneLiner: "View revenue, sessions, participants, register status, and alerts.",
    h1: "See today's sessions, revenue, bookings, register status, and alerts.",
    subheadline:
      "Give managers live operational and financial visibility without manual spreadsheet reports.",
    problem:
      "Spreadsheet reports tell you what happened last week — by the time they're built, the business has already moved on.",
    howItWorks: [
      "Live dashboard metrics for sessions and bookings.",
      "Revenue and outstanding balance visibility.",
      "Staff fees calculated alongside sessions worked.",
      "No-show risk and gear alerts surfaced automatically.",
      "Register closure summaries without manual reconciliation.",
    ],
    benefits: [
      "Same-day visibility",
      "Less manual reporting",
      "Clearer staff fee tracking",
      "Fewer surprises at close",
    ],
    mockup: "ProductDashboardMockup",
  },
  {
    slug: "audit-trail",
    icon: "shield-check",
    title: "Audit Trail",
    eyebrow: "Know what changed",
    oneLiner: "Know who changed what, when, and why.",
    h1: "Know who changed what, when, and why.",
    subheadline:
      "Keep a searchable history of operational changes across sessions, bookings, payments, staff, and settings.",
    problem:
      "When a booking or price looks wrong after the fact, there's rarely a reliable record of who changed it or when.",
    howItWorks: [
      "Every mutation logged automatically, not opt-in.",
      "Staff accountability tied to each change.",
      "Fast troubleshooting when something looks off.",
      "Searchable history across sessions, payments, and gear.",
      "A compliance-ready record of operational changes.",
    ],
    benefits: [
      "Faster troubleshooting",
      "Clear staff accountability",
      "Compliance-ready history",
      "Nothing changes silently",
    ],
    mockup: "AuditLogMockup",
  },
  {
    slug: "settings-branding",
    icon: "settings",
    title: "Settings & Branding",
    eyebrow: "Make it yours",
    oneLiner: "Configure organization, rules, branding, templates, and booking experience.",
    h1: "Configure your school workspace, rules, branding, and booking experience.",
    subheadline:
      "Manage organization settings, legal text, activity rules, templates, integrations, and customer-facing branding.",
    problem:
      "Every operator runs slightly differently — rigid, one-size-fits-all software forces awkward workarounds.",
    howItWorks: [
      "Organization-wide settings and legal text.",
      "Activity-specific rules and capacity settings.",
      "Integrations configured per workspace.",
      "Editable email and notification templates.",
      "Custom branding for the booking experience.",
    ],
    benefits: [
      "Fits how you actually operate",
      "Consistent customer-facing branding",
      "Fewer manual workarounds",
      "Faster onboarding for new staff",
    ],
    mockup: "AuditLogMockup",
  },
];

export const productPillars = [
  {
    title: "Plan",
    icon: "calendar",
    description: "Agenda, sessions, staff, tide context.",
    detail: "Today · 24 sessions",
  },
  {
    title: "Sell",
    icon: "credit-card",
    description: "POS, online booking, deposits, checkout links.",
    detail: "€1,240 revenue",
  },
  {
    title: "Operate",
    icon: "package",
    description: "Rentals, gear, trips, manifests.",
    detail: "Gear Ready",
  },
  {
    title: "Communicate",
    icon: "bell",
    description: "Email/SMS confirmations, reminders, cancellations.",
    detail: "Notification Queued",
  },
  {
    title: "Measure",
    icon: "bar-chart",
    description: "Revenue, staff fees, register closure, no-shows.",
    detail: "Register Open",
  },
];

export const problemCards = [
  { title: "Spreadsheets", subtitle: "scheduling", icon: "grid" },
  { title: "WhatsApp", subtitle: "staff updates", icon: "message-circle" },
  { title: "Paper forms", subtitle: "customer data", icon: "file-text" },
  { title: "Manual POS", subtitle: "payments", icon: "credit-card" },
  { title: "Memory", subtitle: "gear availability", icon: "brain" },
  { title: "After-the-fact reports", subtitle: "business visibility", icon: "bar-chart" },
];

export const hubModules = [
  "Sessions",
  "Staff",
  "Participants",
  "Gear",
  "Trips",
  "POS",
  "Online Booking",
  "Notifications",
  "Reports",
];

export type PricingPlan = {
  name: string;
  price: string;
  recommended?: boolean;
  audience: string;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "€29/month",
    audience: "For single instructors or small operators.",
    features: ["Core scheduling", "Online booking", "Basic POS", "0% commission"],
  },
  {
    name: "Grow",
    price: "€59/month",
    recommended: true,
    audience: "For growing schools with staff and gear.",
    features: [
      "Full operations",
      "Gear inventory",
      "Reports",
      "AI copilot",
      "Staff workflows",
      "0% commission",
    ],
  },
  {
    name: "Scale",
    price: "€99/month",
    audience: "For larger or multi-location operators.",
    features: [
      "Multi-location support",
      "Partners/resellers",
      "Custom branding",
      "Priority support",
      "Advanced reporting",
      "0% commission",
    ],
  },
];

export const pricingMatrixRows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "0% commission", values: [true, true, true] },
  { label: "Online booking", values: [true, true, true] },
  { label: "POS", values: [true, true, true] },
  { label: "Live agenda", values: [true, true, true] },
  { label: "Staff scheduling", values: [false, true, true] },
  { label: "Gear inventory", values: [false, true, true] },
  { label: "Reports", values: [false, true, true] },
  { label: "AI copilot", values: [false, true, true] },
  { label: "Partners/resellers", values: [false, false, true] },
  { label: "Custom branding", values: [false, false, true] },
  { label: "Multi-location", values: [false, false, true] },
  { label: "Priority support", values: [false, false, true] },
];

export const pricingFaq = [
  {
    question: "Do you charge commission?",
    answer: "No. AquaRosters charges 0% commission on direct bookings at every plan level, always.",
  },
  {
    question: "Can I start monthly?",
    answer: "Yes. All plans are simple monthly pricing — no annual lock-in required to get started.",
  },
  {
    question: "Is AI included?",
    answer: "The AI copilot is included on the Grow and Scale plans.",
  },
  {
    question: "Can I use AquaRosters for one instructor?",
    answer: "Yes. The Starter plan is built for single instructors and small operators.",
  },
  {
    question: "Is it only for dive centers?",
    answer: "No. AquaRosters is built for dive centers and watersports schools alike, including kitesurf, surf, and rental operators.",
  },
  {
    question: "Can I join as a design partner?",
    answer: "Yes — we're currently accepting design partners. Apply on the Design Partners page.",
  },
];

export const comparisonRows = [
  {
    alternative: "Spreadsheets",
    limitation: "Manual and error-prone",
    position: "One live source of truth",
  },
  {
    alternative: "WhatsApp",
    limitation: "No operational structure",
    position: "Changes tied to sessions and participants",
  },
  {
    alternative: "Generic booking tools",
    limitation: "Sell slots only",
    position: "Runs the operational day",
  },
  {
    alternative: "OTA dependency",
    limitation: "High commission and weak ownership",
    position: "Direct bookings with 0% commission",
  },
  {
    alternative: "Broad legacy platforms",
    limitation: "Add-on complexity",
    position: "Focused, modern, simple pricing",
  },
];

export const designPartnerBenefits = [
  "Extended free access during design partner phase",
  "Founder pricing",
  "Direct influence on roadmap",
  "Early access to live agenda, POS, gear, and reporting workflows",
  "Opportunity to become a launch case study",
];

export const diveCenterFeatures = [
  "Certification and license tracking",
  "Trip manifests",
  "Gear availability and maintenance",
  "Staff and instructor assignment",
  "POS and online bookings",
  "Deposit and balance tracking",
];

export const kitesurfFeatures = [
  "Drag-and-drop rescheduling",
  "Tide and weather context",
  "Participant transfer between sessions",
  "SMS/email updates",
  "Gear and staff visibility",
  "Mobile-friendly agenda",
];

export const blogPosts = [
  {
    slug: "why-dive-centers-need-more-than-booking-software",
    title: "Why dive centers need more than booking software",
    excerpt:
      "Booking a slot is the easy part. Running the boat, the gear, and the manifest afterward is where most tools stop helping.",
    body: [
      "Most booking software is built to answer one question: is this time slot free? For a dive center, that's the smallest part of the job. Once a course or trip is booked, someone still has to assign an instructor, check certifications, allocate gear, build a manifest, and track a deposit through to a final balance.",
      "That's the gap AquaRosters is built to close — treating the booking as the start of an operational workflow, not the end of one.",
    ],
  },
  {
    slug: "how-watersports-schools-can-reduce-scheduling-chaos",
    title: "How watersports schools can reduce scheduling chaos",
    excerpt:
      "Wind, tide, and instructor availability change fast. Your schedule needs to move as fast as they do.",
    body: [
      "When conditions change, the schedule has to change with them — and every session that moves has a chain of consequences: an instructor to reassign, participants to notify, gear to reallocate.",
      "A live agenda with conflict checks built in turns that chain reaction into a single workflow instead of five separate manual steps.",
    ],
  },
  {
    slug: "why-zero-percent-commission-matters-for-direct-bookings",
    title: "Why 0% commission matters for direct bookings",
    excerpt:
      "Every booking you bring in yourself is a booking a commission-based platform shouldn't be taking a cut of.",
    body: [
      "Marketplaces and OTAs earn their commission by bringing you new customers. When a returning customer books directly with you, that same commission structure just quietly reduces your margin.",
      "AquaRosters charges a simple monthly fee instead — so a direct booking stays a direct booking, at full value.",
    ],
  },
  {
    slug: "how-to-choose-software-for-activity-operations",
    title: "How to choose software for activity operations",
    excerpt:
      "The right question isn't 'does it take bookings' — it's 'does it run the rest of my day too'.",
    body: [
      "Booking capability is table stakes at this point. The better question when evaluating software is what happens after the booking: staff assignment, gear tracking, trip manifests, payments, and reporting.",
      "Operators who evaluate software against the full operational day, not just checkout, tend to end up with tools they don't outgrow in six months.",
    ],
  },
  {
    slug: "the-hidden-cost-of-running-your-business-from-spreadsheets",
    title: "The hidden cost of running your business from spreadsheets",
    excerpt:
      "Spreadsheets don't fail loudly. They fail quietly, one manual update at a time.",
    body: [
      "Spreadsheets are flexible, familiar, and cheap — which is exactly why they're so common in activity operations. But every manual update is a chance for a stale row, a missed instructor conflict, or a gear double-booking to slip through.",
      "The cost isn't one dramatic failure. It's the accumulated time spent reconciling by hand, every single day.",
    ],
  },
];
