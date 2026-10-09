import { todos } from "@/lib/todos";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === Number(id));

  return Response.json(todo);
}

export async function DELETE() {}
