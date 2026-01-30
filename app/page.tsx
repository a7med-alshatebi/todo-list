"use client";

import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Todo List
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Start by managing your tasks state.
          </p>
        </header>

        <div className="mb-6">
          <AddTaskForm onAdd={handleAddTask} />
        </div>

        <section className="rounded-xl border border-dashed border-zinc-200 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Current tasks:</p>
          <p className="mt-2">{tasks.length === 0 ? "No tasks yet." : `${tasks.length} task(s).`}</p>
        </section>
      </main>
    </div>
  );
}
