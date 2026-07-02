export default function PeekingCat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 170" className={className} fill="none">
      {/* paws */}
      <rect x="55" y="120" width="38" height="50" rx="19" fill="#ffffff" />
      <rect x="127" y="120" width="38" height="50" rx="19" fill="#ffffff" />
      <ellipse cx="74" cy="150" rx="16" ry="13" fill="#fff" />
      <ellipse cx="146" cy="150" rx="16" ry="13" fill="#fff" />
      {/* ears */}
      <path d="M62 46 L80 88 L44 80 Z" fill="#ffffff" />
      <path d="M158 46 L176 80 L140 88 Z" fill="#F0672A" />
      {/* head */}
      <circle cx="110" cy="102" r="58" fill="#ffffff" />
      <path
        d="M132 56c18 4 34 22 34 46 0 15-6 28-15 37-11-4-20-15-24-30-4-16 0-42 5-53Z"
        fill="#F0672A"
      />
      {/* eyes closed happy */}
      <path
        d="M84 100c4-6 12-6 16 0M124 100c4-6 12-6 16 0"
        stroke="#2A2119"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* nose + mouth */}
      <path d="M103 112 L117 112 L110 120 Z" fill="#F0672A" />
      <path
        d="M110 120c0 5-5 8-11 7M110 120c0 5 5 8 11 7"
        stroke="#2A2119"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* blush */}
      <circle cx="78" cy="118" r="7" fill="#FFB89C" opacity=".6" />
      <circle cx="142" cy="118" r="7" fill="#FFB89C" opacity=".6" />
    </svg>
  );
}
