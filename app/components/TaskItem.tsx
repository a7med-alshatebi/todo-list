type TaskItemProps = {
  task: string;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <span className="break-words">{task}</span>
    </li>
  );
}
