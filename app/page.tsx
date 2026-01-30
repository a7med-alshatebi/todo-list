"use client";

import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";

export type Priority = "low" | "medium" | "high";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: string, priority: Priority) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text: task, completed: false, priority },
    ]);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 font-sans dark:from-zinc-950 dark:via-purple-950 dark:to-indigo-950 sm:px-6 sm:py-12">
      <main className="w-full max-w-2xl rounded-3xl bg-white/80 p-4 shadow-xl backdrop-blur-sm dark:bg-zinc-900/80 sm:p-6 md:p-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 sm:text-4xl">
            Todo List
          </h1>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
            Organize your tasks with style and priority.
          </p>
        </header>

        <div className="mb-4 sm:mb-6">
          <AddTaskForm onAdd={handleAddTask} />
        </div>

        <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-4 shadow-sm dark:border-indigo-900/50 dark:from-zinc-900 dark:to-indigo-950/30 sm:p-6">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:text-base">Your Tasks</p>
          {tasks.length === 0 ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 sm:text-sm">No tasks yet. Add one to get started!</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3">
              {tasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
