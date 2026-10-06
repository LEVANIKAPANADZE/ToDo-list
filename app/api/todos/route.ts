import { todos } from "@/lib/todos";

export async function GET() {
  return Response.json(todos);
}
