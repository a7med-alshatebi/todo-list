"use client";

import { useState } from "react";
import type { Priority } from "../page";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

const priorityStyles = {
  low: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm",
  medium: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm",
  high: "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm",
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-3 rounded-2xl border-2 border-indigo-100 bg-white px-4 py-4 shadow-md transition hover:shadow-lg dark:border-indigo-900/50 dark:bg-zinc-900/80">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 cursor-pointer rounded-lg border-2 border-indigo-300 text-indigo-600 transition focus:ring-2 focus:ring-indigo-400 dark:border-indigo-700 dark:bg-zinc-800 dark:text-indigo-500 dark:focus:ring-indigo-600"
      />
      
      <div className="flex flex-1 flex-col gap-2">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="rounded-lg border-2 border-indigo-300 bg-white px-3 py-1.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-indigo-700 dark:bg-zinc-900 dark:focus:border-indigo-600 dark:focus:ring-indigo-900/50"
            autoFocus
          />
        ) : (
          <span className={`break-words text-zinc-900 dark:text-zinc-100 ${task.completed ? "text-zinc-400 line-through dark:text-zinc-500" : ""}`}>
            {task.text}
          </span>
        )}
        <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-emerald-600 hover:to-teal-600 hover:shadow-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="rounded-lg bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-blue-600 hover:to-indigo-600 hover:shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-rose-600 hover:to-pink-600 hover:shadow-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
