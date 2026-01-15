"use client";

import { notify } from "@/lib/toast";
import { useEffect, useState } from "react";
import type React from "react";
import { useTodoStore } from "@/lib/state/store";

export default function SearchTodo() {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
     
    const trimmedTitle = searchQuery.trim(); 
    setIsLoading(true);
    try { 
      await fetchTodos(trimmedTitle);
    } catch {
      notify.error("Failed search");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{ 
    const timer = setTimeout(() => {
      fetchData()
    }, 1000);

    return () => clearTimeout(timer); 
  },[searchQuery])

  return (
    <div>
      <input
        name="title"
        placeholder="Add a new task"
        className="flex-1 rounded-full border border-slate-200 bg-white/90 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--sky))]/40"
        value={searchQuery}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(event.target.value)
        }
      />
    </div>
  );
}
