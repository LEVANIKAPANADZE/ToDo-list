type Todo = {
  id: number;
  todo: string;
};

type ListProps = {
  data: Todo[];
};

export default function List({ data }: ListProps) {
  return (
    <div>
      {data.map((element) => (
        <div>
          <input type="checkbox" />
          <span key={element.id}>{element.todo}</span>
        </div>
      ))}
    </div>
  );
}
