export default function SleepingCat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 170" className={className} fill="none">
      {/* cushion */}
      <ellipse cx="130" cy="145" rx="115" ry="22" fill="#2E6B63" opacity=".18" />
      <rect x="20" y="118" width="220" height="38" rx="19" fill="#2E6B63" />
      {/* body curl */}
      <path
        d="M55 130c-18-10-24-34-10-52 12-15 34-20 52-14 8-14 24-22 40-20 22 2 38 20 40 42 1 12-3 24-11 33-14 16-38 22-60 18-20-4-38-1-51 3 0-4 0-7 0-10Z"
        fill="#ffffff"
      />
      {/* orange patches */}
      <path
        d="M150 46c16 1 30 14 34 32 2 10 0 20-5 28-12-2-22-12-27-26-4-12-4-24-2-34Z"
        fill="#F0672A"
      />
      <ellipse cx="70" cy="108" rx="18" ry="12" fill="#F0672A" opacity=".9" />
      {/* ear */}
      <path d="M92 58 L100 78 L78 76 Z" fill="#ffffff" />
      <path d="M124 52 L140 66 L118 72 Z" fill="#F0672A" />
      {/* face */}
      <path
        d="M84 100c4-5 10-5 14 0M110 100c4-5 10-5 14 0"
        stroke="#2A2119"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M99 108c0 3-3 5-7 4.5" stroke="#2A2119" strokeWidth="2.6" strokeLinecap="round" />
      {/* tail */}
      <path
        d="M188 118c14 4 26-2 30-14"
        stroke="#F0672A"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}
