export type TodoFilter = "all" | "active" | "completed";

type FilterProps = {
  itemsLeft: number;
  activeFilter: TodoFilter;
  setActiveFilter: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
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
    <div className="flex items-center justify-between gap-4">
      <span>
        {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
      </span>

      <div className="flex gap-3" role="group" aria-label="Filter todos">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </div>
  );
}
