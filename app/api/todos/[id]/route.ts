import { todos } from "@/lib/todos";

function getValidId(id: string): number | null {
  const parsedId = Number(id);

  return Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const validId = getValidId(id);

  if (validId === null) {
    return Response.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  const todo = todos.find((todo) => todo.id === validId);

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json(todo);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const validId = getValidId(id);

  if (validId === null) {
    return Response.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  const todo = todos.find((todo) => todo.id === validId);

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
  const validId = getValidId(id);

  if (validId === null) {
    return Response.json({ error: "Invalid todo ID" }, { status: 400 });
  }

  const index = todos.findIndex((todo) => todo.id === validId);

  if (index === -1) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  const [deletedTodo] = todos.splice(index, 1);

  return Response.json(deletedTodo);
}
