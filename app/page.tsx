"use client";

import { useState, useEffect } from "react";
import Input from "./components/Input";
import List from "./components/List";

export default function Home() {
  useEffect(() => {
    getTodos();
  }, []);

  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const url = "/api/todos";

  async function handleAdd(): Promise<void> {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        todo,
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
      const todos = await response.json();
      setData(todos);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <List data={data} />

      <span>Drag and drop to reorder list</span>
    </div>
  );
}
