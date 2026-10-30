import Image from "next/image";

type Todo = {
  id: number;
  todo: string;
};

type ListProps = {
  data: Todo[];
  handleDelete: (id: number) => void;
};

export default function List({ data, handleDelete }: ListProps) {
  return (
    <div>
      {data.map((element) => (
        <div key={element.id}>
          <input type="checkbox" />
          <span>{element.todo}</span>
          <button onClick={() => handleDelete(element.id)}>
            <Image src="/icon-cross.svg" alt="Delete" width={18} height={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
