"use client";

import Image from "next/image";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

type ListProps = {
  data: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
  handleReorder: (activeId: number, overId: number) => void | Promise<void>;
  sortingDisabled?: boolean;
};

function SortableTodo({
  todo,
  index,
  handleDelete,
  handleToggle,
  sortingDisabled,
}: {
  todo: Todo;
  index: number;
  handleDelete: ListProps["handleDelete"];
  handleToggle: ListProps["handleToggle"];
  sortingDisabled: boolean;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: todo.id,
    index,
    disabled: sortingDisabled,
  });

  return (
    <div
      ref={ref}
      role="listitem"
      className={`flex items-center gap-3 ${isDragging ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => handleToggle(todo.id, event.currentTarget.checked)}
        aria-label={`Mark ${todo.todo} as ${
          todo.completed ? "active" : "completed"
        }`}
      />

      <span
        ref={handleRef}
        role="button"
        tabIndex={sortingDisabled ? -1 : 0}
        aria-label={`Reorder ${todo.todo}`}
        aria-disabled={sortingDisabled}
        className={`cursor-grab touch-none select-none active:cursor-grabbing focus-visible:outline-2 ${
          todo.completed ? "line-through opacity-50" : ""
        }`}
      >
        {todo.todo}
      </span>

      <button
        type="button"
        onClick={() => handleDelete(todo.id)}
        aria-label={`Delete ${todo.todo}`}
      >
        <Image src="/icon-cross.svg" alt="" width={18} height={18} />
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
