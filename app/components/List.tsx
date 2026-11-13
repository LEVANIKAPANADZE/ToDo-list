import Image from "next/image";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

type ListProps = {
  data: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
};

export default function List({ data, handleDelete, handleToggle }: ListProps) {
  return (
    <div>
      {data.map((element) => (
        <div key={element.id}>
          <input
            type="checkbox"
            checked={element.completed}
            onChange={(event) =>
              handleToggle(element.id, event.currentTarget.checked)
            }
            aria-label={`Mark ${element.todo} as ${
              element.completed ? "active" : "completed"
            }`}
          />

          <span className={element.completed ? "line-through opacity-50" : ""}>
            {element.todo}
          </span>

          <button type="button" onClick={() => handleDelete(element.id)}>
            <Image src="/icon-cross.svg" alt="Delete" width={18} height={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
