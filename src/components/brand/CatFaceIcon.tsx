export default function CatFaceIcon({
  className = "",
  faceColor = "#ffffff",
  patchColor = "#F0672A",
  featureColor = "#2A2119",
}: {
  className?: string;
  faceColor?: string;
  patchColor?: string;
  featureColor?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* ears */}
      <path d="M28 20 L40 44 L20 40 Z" fill={faceColor} />
      <path d="M72 20 L80 40 L60 44 Z" fill={patchColor} />
      {/* head */}
      <circle cx="50" cy="56" r="30" fill={faceColor} />
      {/* patch over right eye/cheek */}
      <path
        d="M62 30c10 2 18 12 18 24 0 8-3 15-8 20-6-2-11-8-13-16-2-9 0-22 3-28Z"
        fill={patchColor}
      />
      {/* eyes */}
      <circle cx="40" cy="54" r="3.6" fill={featureColor} />
      <circle cx="60" cy="54" r="3.6" fill={featureColor} />
      {/* nose */}
      <path d="M47 63 L53 63 L50 67 Z" fill={patchColor} />
      {/* mouth */}
      <path
        d="M50 67c0 3-3 5-6 4.5M50 67c0 3 3 5 6 4.5"
        stroke={featureColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* whiskers */}
      <path
        d="M18 52h12M18 60h11M70 52h12M71 60h11"
        stroke={faceColor}
        strokeOpacity="0"
      />
    </svg>
  );
}
