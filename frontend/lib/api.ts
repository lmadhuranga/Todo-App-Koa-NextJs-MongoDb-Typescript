import { Todo } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getTodos() {
  const res = await fetch(`${API_URL}/todos`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Unable to fetch todos");
  }

  return res.json();
}
