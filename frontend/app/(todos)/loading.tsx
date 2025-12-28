export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
        </div>

        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="h-10 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
