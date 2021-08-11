import React, { useState } from "react";

import TodoList from "../component/TodoList";
import useTodo from "../hooks/useTodo";

const TodoPage: React.FC = () => {
  const { todos, createTodoList } = useTodo();

  const [newTaskInput, setNewTaskInput] = useState<string>("");

  const onNewTodoList = () => {
    if (newTaskInput === "") {
      return;
    }

    createTodoList(newTaskInput);
    setNewTaskInput("");
  };

  return (
    <div className="flex flex-col items-center p-2">
      <h1 className="font-semibold text-3xl">Todo App</h1>

      <div className="flex items-center py-5 w-2/3">
        <div className="w-2/3">
          <input
            className="bg-white appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="What to do?"
            value={newTaskInput}
            onChange={(e) => {
              setNewTaskInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                return;
              }
              onNewTodoList();
            }}
          />
        </div>
        <div className="w-1/3 pl-2">
          <button
            className="w-full bg-gray-200 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded border-2 border-black leading-tight"
            onClick={onNewTodoList}
          >
            New List
          </button>
        </div>
      </div>
      <div className="w-2/3">
        <TodoList todos={todos}></TodoList>
      </div>
    </div>
  );
};

export default TodoPage;
