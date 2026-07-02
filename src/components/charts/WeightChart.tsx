const DEFAULT_WEIGHTS = [
  { m: "Des", v: 3.2 },
  { m: "Jan", v: 3.5 },
  { m: "Feb", v: 3.8 },
  { m: "Mar", v: 4.0 },
  { m: "Apr", v: 4.1 },
  { m: "Mei", v: 4.2 },
];

export default function WeightChart({
  data = DEFAULT_WEIGHTS,
  height = 130,
}: {
  data?: { m: string; v: number }[];
  height?: number;
}) {
  const w = 600;
  const pad = 20;
  const h = height;
  const max = 5;
  const min = 1;
  const step = w / (data.length - 1);
  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = h - ((d.v - min) / (max - min)) * h;
    return { x, y, ...d };
  });
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L${pad + w},${h} L${pad},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w + pad * 2} ${h + 24}`} className="w-full">
      <defs>
        <linearGradient id="weightFillShared" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0672A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F0672A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#weightFillShared)" />
      <path
        d={linePath}
        fill="none"
        stroke="#F0672A"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {points.map((p) => (
        <circle
          key={p.m}
          cx={p.x}
          cy={p.y}
          r="4.5"
          fill="#ffffff"
          stroke="#F0672A"
          strokeWidth="3"
        />
      ))}
      {points.map((p) => (
        <text
          key={`${p.m}-label`}
          x={p.x}
          y={h + 18}
          textAnchor="middle"
          fontSize="11"
          fill="#a99c8e"
        >
          {p.m}
        </text>
      ))}
    </svg>
  );
}
