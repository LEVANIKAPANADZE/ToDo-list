"use client";

import { useState, useEffect, useCallback } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Filter from "./components/Filter";
import type { Todo, TodoFilter } from "@/lib/types";

const url = "/api/todos";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<TodoFilter>("all");

  const getTodos = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Failed to fetch todos");
        return;
      }

      const todos: Todo[] = await response.json();
      setData(todos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void getTodos();
  }, [getTodos]);

  async function handleAdd(): Promise<void> {
    const trimmedTodo = todo.trim();

    if (!trimmedTodo) {
      console.error("Todo cannot be empty");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ todo: trimmedTodo }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to add todo");
        return;
      }

      setTodo("");
      await getTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number): Promise<void> {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete todo");
        return;
      }

      await getTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggle(id: number, completed: boolean): Promise<void> {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to update todo");
        return;
      }

      await getTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleReorder(
    activeId: number,
    overId: number,
  ): Promise<void> {
    if (activeFilter !== "all") return;

    const activeIndex = data.findIndex((item) => item.id === activeId);
    const overIndex = data.findIndex((item) => item.id === overId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
      return;
    }

    const reorderedData = [...data];
    const [movedTodo] = reorderedData.splice(activeIndex, 1);

    reorderedData.splice(overIndex, 0, movedTodo);

    setData(reorderedData);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          ids: reorderedData.map((item) => item.id),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to save todo order");
        await getTodos();
      }
    } catch (error) {
      console.error(error);
      await getTodos();
    }
  }

  async function handleClearCompleted(): Promise<void> {
    const completedTodos = data.filter((item) => item.completed);

    if (completedTodos.length === 0) return;

    try {
      const responses = await Promise.all(
        completedTodos.map((item) =>
          fetch(`${url}/${item.id}`, {
            method: "DELETE",
          }),
        ),
      );

      if (responses.some((response) => !response.ok)) {
        console.error("Failed to clear some completed todos");
      }

      await getTodos();
    } catch (error) {
      console.error(error);
      await getTodos();
    }
  }

  const visibleTodos = data.filter((item) => {
    if (activeFilter === "active") return !item.completed;
    if (activeFilter === "completed") return item.completed;
    return true;
  });

  return (
    <main className="mx-auto w-full max-w-[540px] xl:max-w-[700px] flex-1 px-6 pb-16">
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <div className="relative rounded-md bg-white shadow-[0_35px_50px_-15px_rgba(194,195,214,0.5)] max-md:mb-[100px] dark:bg-[#25273d] dark:shadow-[0_35px_50px_-15px_rgba(0,0,0,0.5)]">
        <List
          data={visibleTodos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
          handleReorder={handleReorder}
          sortingDisabled={activeFilter !== "all"}
        />

        <Filter
          itemsLeft={data.filter((item) => !item.completed).length}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onClearCompleted={handleClearCompleted}
          hasCompletedTodos={data.some((item) => item.completed)}
        />
      </div>

      <p className="mx-auto w-full text-center text-sm text-[#9495a5] md:mt-11 dark:text-[#5b5e7e]">
        Drag and drop to reorder list
      </p>
    </main>
  );
}
