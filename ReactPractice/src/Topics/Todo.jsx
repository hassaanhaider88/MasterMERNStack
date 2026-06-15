import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [todoIndex, setTodoIndex] = useState(0);
  function handleTodoAdd() {
    const newTodo = {
      id: todoIndex,
      completed: false,
      text: inputVal,
    };
    setTodos([...todos, newTodo]);
    setTodoIndex(todoIndex + 1);
  }
  console.log(todos);
  function handleTodoUpdate(todo) {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  }
  return (
    <div>
      <h1>TOdo Projects</h1>
      <div className="py-4 px-5 space-x-2">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          className="border-2 rounded-2xl pl-2"
          placeholder="place your todo here.."
        />
        <button
          onClick={handleTodoAdd}
          className="py-1 px-3 text-taupe-50 rounded-3xl cursor-pointer bg-green-800"
        >
          Add
        </button>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h1>Checked</h1>
          <h1>Todo</h1>
        </div>
        {todos.map((todo, idx) => {
          return (
            <div key={idx} className="flex gap-6 items-center">
              <input
                onChange={() => handleTodoUpdate(todo)}
                checked={todo.completed}
                type="checkbox"
              />
              <h1>{todo?.text}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
