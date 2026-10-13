type InputProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: () => void;
};

export default function Input({ todo, setTodo, handleAdd }: InputProps) {
  console.log(todo);

  return (
    <div>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
