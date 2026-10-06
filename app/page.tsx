"use client";

import { useState } from "react";
import Input from "./components/Input";

export default function Home() {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <Input todo={todo} setTodo={setTodo} />
    </div>
  );
}
