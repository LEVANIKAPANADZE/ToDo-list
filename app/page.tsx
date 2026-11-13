"use client";

import { useState, useEffect, useCallback } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Filter, { type TodoFilter } from "./components/Filter";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

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
        body: JSON.stringify({
          todo: trimmedTodo,
        }),
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

  async function handleClearCompleted(): Promise<void> {
    const completedTodos = data.filter((item) => item.completed);

    if (completedTodos.length === 0) {
      return;
    }

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
    if (activeFilter === "active") {
      return !item.completed;
    }

    if (activeFilter === "completed") {
      return item.completed;
    }

    return true;
  });

  return (
    <div>
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <List
        data={visibleTodos}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />

      <Filter
        todos={data}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onClearCompleted={handleClearCompleted}
        hasCompletedTodos={data.some((item) => item.completed)}
      />
    </div>
  );
}
