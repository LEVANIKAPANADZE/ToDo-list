"use client";

import { useState, useEffect } from "react";
import Input from "./components/Input";
import List from "./components/List";

type Todo = {
  id: number;
  todo: string;
};

export default function Home() {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState<Todo[]>([]);
  const url = "/api/todos";

  useEffect(() => {
    getTodos();
  }, []);

  async function handleAdd(): Promise<void> {
    const trimmedTodo = todo.trim();

    if (!trimmedTodo) {
      console.error("Todo cannot be empty");
      return;
    }

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
  }

  async function getTodos() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Failed to fetch todos");
        return;
      }

      const todos = await response.json();
      setData(todos);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete todo");
      return;
    }

    await getTodos();
  }

  return (
    <div>
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <List data={data} handleDelete={handleDelete} />

      <span>Drag and drop to reorder list</span>
    </div>
  );
}
