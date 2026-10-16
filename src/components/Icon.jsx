const PATHS = {
  wifi: (
    <>
      <path d="M3 9.5a13 13 0 0 1 18 0" />
      <path d="M6.5 13a8 8 0 0 1 11 0" />
      <path d="M10 16.5a3 3 0 0 1 4 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" />
    </>
  ),
  broom: (
    <>
      <path d="M14.5 3.5 11 10" />
      <path d="M7.5 10.5h7l1.5 3.5c.6 1.6.2 4-.6 6.5H6.6C5.8 18 5.4 15.6 6 14z" />
      <path d="M9 20.5c.2-1.6.5-3 1-4.2M12.4 20.5c0-1.5.1-2.9.4-4.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  people: (
    <>
      <circle cx="8.5" cy="8.5" r="3" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M3 19.5c.4-3.1 2.7-5 5.5-5s5.1 1.9 5.5 5" />
      <path d="M14.5 14.6c.6-.3 1.3-.4 2-.4 2.3 0 4.1 1.6 4.5 4.3" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  menu: <path d="M4 8h16M4 16h16" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </>
  ),
  map: (
    <>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </>
  ),
  external: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  sparkle: <path d="m12 3 2.8 5.7L21 12l-6.2 3.3L12 21l-2.8-5.7L3 12l6.2-3.3z" />,
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
}

export default function Icon({ name, size = 24, stroke = 1.5, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
