import { SkeletonInput } from "./SkeletonInput";
import { SkeletonList } from "./SkeletonList";

export default function Loading() {
  return (
    <main style={{ padding: 24 }}>
      <h1>📝 ToDo App</h1>

      <div style={{ marginTop: 16 }}>
        <SkeletonInput />
        <SkeletonList />
      </div>
    </main>
  );
}
