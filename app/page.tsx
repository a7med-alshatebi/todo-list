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
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-12 font-sans dark:from-zinc-950 dark:via-purple-950 dark:to-indigo-950">
      <main className="w-full max-w-2xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:bg-zinc-900/80">
        <header className="mb-8">
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Todo List
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Organize your tasks with style and priority.
          </p>
        </header>

        <div className="mb-6">
          <AddTaskForm onAdd={handleAddTask} />
        </div>

        <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 p-6 shadow-sm dark:border-indigo-900/50 dark:from-zinc-900 dark:to-indigo-950/30">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Your Tasks</p>
          {tasks.length === 0 ? (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">No tasks yet. Add one to get started!</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
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
