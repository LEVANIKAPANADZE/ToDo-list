import { todos } from "@/lib/todos";

export async function POST(request: Request) {
  const todo = await request.json();

  const newTodo = {
    id: todos.length + 1,
    todo: todo.todo,
  };

  todos.push(newTodo);

  return Response.json(newTodo, { status: 201 });
}
