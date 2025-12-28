import { SkeletonInput } from "../SkeletonInput";
import { SkeletonList } from "../SkeletonList";

export default function TodosLoading() {
  return (
    <main style={{ padding: 24 }}>
      <h1>📝 Loading Todos...</h1>
      <SkeletonInput />
      <SkeletonList />
    </main>
  );
}
