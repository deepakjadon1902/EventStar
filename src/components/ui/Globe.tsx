export default function Globe({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`globe-graphic ${className}`}
      viewBox="0 0 540 540"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="globe-glow">
          <stop stopColor="#2F6BFF" stopOpacity=".13" />
          <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="globe-stroke"
          x1="50"
          y1="0"
          x2="500"
          y2="540"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7DA4FF" stopOpacity=".5" />
          <stop offset="1" stopColor="#7DA4FF" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <circle cx="270" cy="270" r="268" fill="url(#globe-glow)" />
      <g stroke="url(#globe-stroke)" transform="rotate(-18 270 270)">
        <circle cx="270" cy="270" r="215" />
        <ellipse cx="270" cy="270" rx="155" ry="215" />
        <ellipse cx="270" cy="270" rx="70" ry="215" />
        <ellipse cx="270" cy="270" rx="215" ry="80" />
        <ellipse cx="270" cy="270" rx="215" ry="155" />
        <path d="M55 270h430M270 55v430" />
        <circle cx="270" cy="270" r="246" strokeDasharray="3 9" opacity=".4" />
      </g>
      <path
        d="M128 213Q268 35 422 255M128 213Q253 360 390 372"
        stroke="#6796FF"
        strokeDasharray="4 6"
        strokeOpacity=".7"
      />
      <g fill="#91B2FF">
        <circle cx="128" cy="213" r="5" />
        <circle cx="422" cy="255" r="5" />
        <circle cx="390" cy="372" r="5" />
      </g>
      <g stroke="#6796FF" strokeOpacity=".25">
        <circle cx="128" cy="213" r="14" />
        <circle cx="422" cy="255" r="14" />
        <circle cx="390" cy="372" r="14" />
      </g>
      <text x="100" y="191" fill="#91A9D6" fontSize="10" fontFamily="Inter">
        NORTH AMERICA
      </text>
      <text x="365" y="231" fill="#91A9D6" fontSize="10" fontFamily="Inter">
        EUROPE
      </text>
      <text x="355" y="403" fill="#91A9D6" fontSize="10" fontFamily="Inter">
        ASIA-PACIFIC
      </text>
    </svg>
  );
}
