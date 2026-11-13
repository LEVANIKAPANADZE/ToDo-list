export type TodoFilter = "all" | "active" | "completed";

type FilterProps = {
  itemsLeft: number;
  activeFilter: TodoFilter;
  setActiveFilter: (filter: TodoFilter) => void;
  onClearCompleted: () => void | Promise<void>;
  hasCompletedTodos: boolean;
};

const filters: { label: string; value: TodoFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function Filter({
  itemsLeft,
  activeFilter,
  setActiveFilter,
  onClearCompleted,
  hasCompletedTodos,
}: FilterProps) {
  return (
    <div className="relative flex h-[50px] items-center justify-between gap-4 px-5 text-xs text-[#9495a5] md:px-6 md:text-sm dark:text-[#5b5e7e]">
      <span>
        {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
      </span>

      <div
        className="absolute flex gap-4 text-sm font-bold max-md:inset-x-0 max-md:top-full max-md:mt-4 max-md:h-12 max-md:items-center max-md:justify-center max-md:rounded-md max-md:bg-white max-md:shadow-[0_35px_50px_-15px_rgba(194,195,214,0.5)] max-md:dark:bg-[#25273d] max-md:dark:shadow-[0_35px_50px_-15px_rgba(0,0,0,0.5)] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        role="group"
        aria-label="Filter todos"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#3a7bfd] ${
              activeFilter === filter.value
                ? "text-[#3a7bfd]"
                : "text-[#9495a5] hover:text-[#494c6b] dark:text-[#5b5e7e] dark:hover:text-[#e3e4f1]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={!hasCompletedTodos}
        className="cursor-pointer transition-colors hover:text-[#494c6b] focus-visible:outline-2 focus-visible:outline-[#3a7bfd] disabled:cursor-default disabled:opacity-50 disabled:hover:text-inherit dark:hover:text-[#e3e4f1]"
      >
        Clear Completed
      </button>
    </div>
  );
}
