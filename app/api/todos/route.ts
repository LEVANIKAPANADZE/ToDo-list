import { todos } from "@/lib/todos";

export async function GET() {
  return Response.json(todos);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const todoText =
    typeof body === "object" &&
    body !== null &&
    "todo" in body &&
    typeof body.todo === "string"
      ? body.todo.trim()
      : "";

  if (!todoText) {
    return Response.json({ error: "Todo cannot be empty" }, { status: 400 });
  }

  const id = todos.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

  const newTodo = {
    id,
    todo: todoText,
    completed: false,
  };

  todos.push(newTodo);

  return Response.json(newTodo, { status: 201 });
}
