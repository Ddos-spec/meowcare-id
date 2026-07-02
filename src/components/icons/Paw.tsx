export function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <ellipse cx="12" cy="16" rx="6" ry="5" />
      <ellipse cx="4.5" cy="9.5" rx="2.4" ry="3" />
      <ellipse cx="9.5" cy="5.5" rx="2.4" ry="3" />
      <ellipse cx="14.5" cy="5.5" rx="2.4" ry="3" />
      <ellipse cx="19.5" cy="9.5" rx="2.4" ry="3" />
    </svg>
  );
}
