type InputProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: () => void;
};

export default function Input({ todo, setTodo, handleAdd }: InputProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAdd();
      }}
      className="mb-6 flex h-12 items-center gap-3 rounded-md bg-white px-5 md:h-16 md:gap-6 md:px-6 dark:bg-[#25273d]"
    >
      <button
        type="submit"
        aria-label="Add todo"
        disabled={!todo.trim()}
        className="h-5 w-5 shrink-0 cursor-pointer rounded-full border border-[#e3e4f1] transition-colors hover:border-[#a45cf0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3a7bfd] disabled:cursor-default disabled:hover:border-[#e3e4f1] md:h-6 md:w-6 dark:border-[#393a4b] dark:disabled:hover:border-[#393a4b]"
      />

      <input
        type="text"
        placeholder="Create a new todo..."
        aria-label="New todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-xs text-[#494c6b] caret-[#3a7bfd] outline-none placeholder:text-[#9495a5] md:text-lg dark:text-[#c8cbe7] dark:placeholder:text-[#767992]"
      />
    </form>
  );
}
