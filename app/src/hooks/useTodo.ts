import { useRecoilValue, useSetRecoilState } from "recoil";
import deepcopy from "deepcopy";
import { v4 } from "uuid";

import { TodoState } from "./../model/todo/todo";

import { todosState } from "../model/todo/todo";
import { Task, Todo } from "../model/todo/todo.d";

const useTodo = () => {
  const todoState = useRecoilValue<TodoState>(todosState);
  const setTodos = useSetRecoilState(todosState);

  const update = (todos: Todo[]) => {
    // api if good then
    setTodos({
      ...todoState,
      todos,
    });
    // else ignore and note error
  };

  const createTodoList = (description: string): void => {
    const newTodo: Todo = {
      id: v4(),
      description,
      checked: false,
      expanded: false,
      subtasks: [],
    };
    update(todoState.todos.concat(newTodo));
  };

  const createSubtask = (description: string, taskId: string): void => {
    const taskIndex = todoState.todos.findIndex((task) => task.id === taskId);

    const newSubtask: Task = {
      id: v4(),
      description,
      checked: false,
    };

    const todos = deepcopy(todoState.todos);
    todos[taskIndex].subtasks = todos[taskIndex].subtasks.concat(newSubtask);
    update(todos);
  };

  const onCheckTask = (id: string) => {
    const todos = deepcopy(todoState.todos);

    for (let i = 0; i < todos.length; i++) {
      const task = todos[i];
      if (task.id === id) {
        todos[i].checked = !todos[i].checked;
      }

      for (let j = 0; j < task.subtasks.length; j++) {
        const subtask = task.subtasks[j];
        if (subtask.id === id) {
          task.subtasks[j].checked = !task.subtasks[j].checked;
        }
      }
    }
  };

  return {
    todos: JSON.parse(JSON.stringify(todoState.todos)),
    createTodoList,
    createSubtask,
    onCheckTask,
    update,
  };
};

export default useTodo;
