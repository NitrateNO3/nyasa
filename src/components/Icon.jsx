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
