type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-500"
      />
      <span className={`flex-1 break-words ${task.completed ? "text-zinc-400 line-through dark:text-zinc-500" : ""}`}>
        {task.text}
      </span>
    </li>
  );
}
