"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskItem from "./components/TaskItem";

export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "completed";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("todo-tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todo-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 sm:text-base">Your Tasks</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition sm:px-4 sm:py-2 ${
                  filter === "all"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition sm:px-4 sm:py-2 ${
                  filter === "active"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition sm:px-4 sm:py-2 ${
                  filter === "completed"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          {filteredTasks.length === 0 ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 sm:text-sm">
              {tasks.length === 0 ? "No tasks yet. Add one to get started!" : `No ${filter} tasks.`}
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3">
              {filteredTasks.map((task) => (
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
