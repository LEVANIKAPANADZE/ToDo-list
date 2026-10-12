import { todos } from "@/lib/todos";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === Number(id));

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
