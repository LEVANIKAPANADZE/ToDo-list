type InputProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({ todo, setTodo }: InputProps) {
  console.log(todo);

  return (
    <div>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </div>
  );
}
