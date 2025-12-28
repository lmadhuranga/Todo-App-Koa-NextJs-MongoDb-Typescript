export function SkeletonList() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          style={{
            height: 28,
            background: "#e5e7eb",
            borderRadius: 6,
            marginBottom: 8,
            animation: "pulse 1.5s ease-in-out infinite"
          }}
        />
      ))}
    </ul>
  );
}
