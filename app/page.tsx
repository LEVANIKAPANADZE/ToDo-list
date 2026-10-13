"use client";

import { useState } from "react";
import Input from "./components/Input";

export default function Home() {
  const [todo, setTodo] = useState("");

  function handleAdd(): void {
    fetch("http://localhost:3000/api/todos/", {
      method: "POST",
      body: JSON.stringify({
        todo,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <div>
      <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
}
