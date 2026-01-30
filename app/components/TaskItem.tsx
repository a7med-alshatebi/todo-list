"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
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
    <li className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-500"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className="flex-1 rounded border border-zinc-300 bg-white px-2 py-1 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          autoFocus
        />
      ) : (
        <span className={`flex-1 break-words ${task.completed ? "text-zinc-400 line-through dark:text-zinc-500" : ""}`}>
          {task.text}
        </span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded px-2 py-1 text-xs font-medium text-green-600 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="rounded px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded px-2 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
