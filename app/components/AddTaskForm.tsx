"use client";

import { FormEvent, useState } from "react";
import type { Priority } from "../page";

type AddTaskFormProps = {
  onAdd: (task: string, priority: Priority) => void;
};

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed, priority);
    setValue("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 shadow-sm dark:from-zinc-800 dark:to-indigo-950/50"
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-indigo-900 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-600 dark:focus:ring-indigo-900/50"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
        >
          Add Task
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Priority:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority("low")}
            className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-sm transition ${
              priority === "low"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md ring-2 ring-emerald-300 dark:ring-emerald-700"
                : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            Low
          </button>
          <button
            type="button"
            onClick={() => setPriority("medium")}
            className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-sm transition ${
              priority === "medium"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-700"
                : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setPriority("high")}
            className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-sm transition ${
              priority === "high"
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md ring-2 ring-rose-300 dark:ring-rose-700"
                : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            High
          </button>
        </div>
      </div>
    </form>
  );
}
