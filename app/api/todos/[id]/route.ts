import { todos } from "@/lib/todos";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === Number(id));

  return Response.json(todo);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "Invalid todo update" }, { status: 400 });
  }

  if (Object.keys(body).some((key) => key !== "completed")) {
    return Response.json(
      { error: "Only completed can be updated" },
      { status: 400 },
    );
  }

  if (!("completed" in body) || typeof body.completed !== "boolean") {
    return Response.json(
      { error: "Completed must be a boolean" },
      { status: 400 },
    );
  }

  todo.completed = body.completed;

  return Response.json(todo);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  const [deletedTodo] = todos.splice(index, 1);

  return Response.json(deletedTodo);
}
