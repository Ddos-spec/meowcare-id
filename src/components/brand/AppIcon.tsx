import CatFaceIcon from "./CatFaceIcon";

export default function AppIcon({
  size = 56,
  rounded = "rounded-[22%]",
  className = "",
}: {
  size?: number;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center bg-gradient-to-br from-brand-400 to-brand-600 ${rounded} shadow-[0_10px_24px_-8px_rgba(240,103,42,0.55)] ${className}`}
    >
      <CatFaceIcon className="h-[72%] w-[72%]" />
    </div>
  );
}
