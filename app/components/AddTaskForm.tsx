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
      className="flex w-full flex-col gap-3"
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Add a task"
          className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
        />
        <button
          type="submit"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Add task
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Priority:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority("low")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              priority === "low"
                ? "bg-green-100 text-green-700 ring-2 ring-green-500 dark:bg-green-950 dark:text-green-300 dark:ring-green-600"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            Low
          </button>
          <button
            type="button"
            onClick={() => setPriority("medium")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              priority === "medium"
                ? "bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 dark:bg-yellow-950 dark:text-yellow-300 dark:ring-yellow-600"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setPriority("high")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              priority === "high"
                ? "bg-red-100 text-red-700 ring-2 ring-red-500 dark:bg-red-950 dark:text-red-300 dark:ring-red-600"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            High
          </button>
        </div>
      </div>
    </form>
  );
}
