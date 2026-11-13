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
    !Array.isArray(body) &&
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

export async function PATCH(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "Invalid todo order" }, { status: 400 });
  }

  if (Object.keys(body).some((key) => key !== "ids")) {
    return Response.json({ error: "Invalid todo order" }, { status: 400 });
  }

  const ids = "ids" in body ? body.ids : null;

  if (
    !Array.isArray(ids) ||
    !ids.every(
      (id: unknown): id is number =>
        typeof id === "number" && Number.isSafeInteger(id) && id > 0,
    )
  ) {
    return Response.json({ error: "Invalid todo order" }, { status: 400 });
  }

  if (
    ids.length !== todos.length ||
    new Set(ids).size !== todos.length ||
    ids.some((id) => !todos.some((todo) => todo.id === id))
  ) {
    return Response.json(
      { error: "Todo order must include every todo exactly once" },
      { status: 400 },
    );
  }

  const orderedTodos = ids.flatMap((id) => {
    const todo = todos.find((item) => item.id === id);
    return todo ? [todo] : [];
  });

  todos.splice(0, todos.length, ...orderedTodos);

  return Response.json(todos);
}
