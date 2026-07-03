const paths: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  shuffle: (
    <path d="M4 6h4l10 12h2M4 18h4l3-3.6M17 6h3v3M20 6l-4.5 5.4M17 18h3v-3" />
  ),
  waves: (
    <path d="M2 9c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0M2 15c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z" />
    </>
  ),
  "credit-card": (
    <>
      <rect x="2" y="5" width="20" height="15" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.4 3-5 6.5-5s6.5 1.6 6.5 5" />
      <path d="M16 4.2c1.7.4 3 1.9 3 3.8 0 1.9-1.3 3.4-3 3.8M20 20c0-2.7-1.8-4.3-4-4.8" />
    </>
  ),
  package: (
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </>
  ),
  ship: (
    <>
      <path d="M3 15l1.5 5.5c.2.6.8 1 1.4.8L12 19l6.1 2.3c.6.2 1.2-.2 1.4-.8L21 15" />
      <path d="M5 15l1-8h12l1 8M12 3v4M9 7h6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 20a2 2 0 004 0" />
    </>
  ),
  "bar-chart": (
    <path d="M4 20V10M12 20V4M20 20v-7" />
  ),
  "shield-check": (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 000-3l1-1.7-1.7-1.7-1.7 1a1.7 1.7 0 00-3 0l-1-1.7L11.3 8l1 1.7a1.7 1.7 0 00-3 0l-1.7-1L4.9 10.4l1 1.7a1.7 1.7 0 000 3l-1 1.7 1.7 1.7 1.7-1a1.7 1.7 0 003 0l1 1.7 1.7-1.7-1-1.7a1.7 1.7 0 003 0l1.7 1 1.7-1.7-1-1.7z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  "message-circle": (
    <path d="M21 12a8 8 0 11-3.4-6.5L21 4l-1 4.5A7.9 7.9 0 0121 12z" />
  ),
  "file-text": (
    <>
      <path d="M6 2h9l5 5v15H6V2z" />
      <path d="M15 2v5h5M9 13h6M9 17h6" />
    </>
  ),
  brain: (
    <path d="M9 3a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 003 3M15 3a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-3 3M9 3v16M15 3v16" />
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </>
  ),
  check: <path d="M4 12.5l5 5L20 7" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  "arrow-right": <path d="M4 12h16M13 5l7 7-7 7" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  "alert-triangle": (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5v.1" />
    </>
  ),
  wind: <path d="M3 8h11a3 3 0 100-6M3 16h15a3 3 0 110 6M3 12h9a3 3 0 100-6" />,
  anchor: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 7.5V21M5 12H3a9 9 0 0018 0h-2M5 12a7 7 0 007 7 7 7 0 007-7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 22s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}
