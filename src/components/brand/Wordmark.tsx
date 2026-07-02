export default function Wordmark({
  className = "",
  size = "text-2xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <p
      className={`font-display font-bold tracking-tight ${size} ${className}`}
    >
      <span className="text-ink">Meow</span>
      <span className="text-brand-500">Care</span>{" "}
      <span className="rounded-md bg-teal-500 px-1.5 py-0.5 text-white text-[0.55em] align-middle font-extrabold">
        ID
      </span>
    </p>
  );
}
