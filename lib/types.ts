import type { Dispatch, ReactNode, SetStateAction } from "react";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export type TodoFilter = "all" | "active" | "completed";

export type TodoFilterOption = {
  label: string;
  value: TodoFilter;
};

export type InputProps = {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  handleAdd: () => void;
};

export type ListProps = {
  data: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
  handleReorder: (activeId: number, overId: number) => void | Promise<void>;
  sortingDisabled?: boolean;
};

export type SortableTodoProps = {
  todo: Todo;
  index: number;
  handleDelete: ListProps["handleDelete"];
  handleToggle: ListProps["handleToggle"];
  sortingDisabled: boolean;
};

export type FilterProps = {
  itemsLeft: number;
  activeFilter: TodoFilter;
  setActiveFilter: (filter: TodoFilter) => void;
  onClearCompleted: () => void | Promise<void>;
  hasCompletedTodos: boolean;
};

export type ProvidersProps = {
  children: ReactNode;
};

export type AppLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type TodoRouteContext = {
  params: Promise<{ id: string }>;
};
