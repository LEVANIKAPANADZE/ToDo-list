"use client";

import Image from "next/image";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import type { ListProps, SortableTodoProps } from "@/lib/types";

function SortableTodo({
  todo,
  index,
  handleDelete,
  handleToggle,
  sortingDisabled,
}: SortableTodoProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: todo.id,
    index,
    disabled: sortingDisabled,
  });

  return (
    <div
      ref={ref}
      role="listitem"
      className={`group flex min-h-[52px] items-center gap-3 border-b border-[#e3e4f1] px-5 py-3 md:min-h-16 md:gap-6 md:px-6 dark:border-[#393a4b] ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => handleToggle(todo.id, event.currentTarget.checked)}
        aria-label={`Mark ${todo.todo} as ${
          todo.completed ? "active" : "completed"
        }`}
        className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#e3e4f1] bg-transparent transition-colors hover:border-[#a45cf0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7bfd] checked:border-transparent checked:bg-[linear-gradient(135deg,#57ddff,#c058f3)] md:h-6 md:w-6 dark:border-[#393a4b]"
      />

      <span
        ref={handleRef}
        role="button"
        tabIndex={sortingDisabled ? -1 : 0}
        aria-label={`Reorder ${todo.todo}`}
        aria-disabled={sortingDisabled}
        className={`min-w-0 flex-1 touch-none select-none break-words text-xs focus-visible:outline-2 focus-visible:outline-[#3a7bfd] md:text-lg ${
          sortingDisabled
            ? "cursor-default"
            : "cursor-grab active:cursor-grabbing"
        } ${
          todo.completed
            ? "text-[#d1d2da] line-through dark:text-[#4d5067]"
            : "text-[#494c6b] dark:text-[#c8cbe7]"
        }`}
      >
        {todo.todo}
      </span>

      <button
        type="button"
        onClick={() => handleDelete(todo.id)}
        aria-label={`Delete ${todo.todo}`}
        className="shrink-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[#3a7bfd] md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
      >
        <Image
          src="/icon-cross.svg"
          alt=""
          width={18}
          height={18}
          className="h-3 w-3 md:h-[18px] md:w-[18px] cursor-pointer"
        />
      </button>
    </div>
  );
}

export default function List({
  data,
  handleDelete,
  handleToggle,
  handleReorder,
  sortingDisabled = false,
}: ListProps) {
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const source = event.operation.source;

        if (!isSortable(source)) return;

        const { initialIndex, index } = source;

        if (initialIndex === index) return;

        const activeId = data[initialIndex]?.id;
        const overId = data[index]?.id;

        if (activeId === undefined || overId === undefined) return;

        void handleReorder(activeId, overId);
      }}
    >
      <div role="list">
        {data.map((todo, index) => (
          <SortableTodo
            key={todo.id}
            todo={todo}
            index={index}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            sortingDisabled={sortingDisabled}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
