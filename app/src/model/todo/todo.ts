import { atom } from "recoil";

import { StateKeys } from "../state-keys.const";

import { Todo } from "./todo.d";

export interface TodoState {
  todos: Todo[];
}

export const todosState = atom<TodoState>({
  key: StateKeys.Todo,
  default: {
    todos: [
      {
        id: "1",
        checked: true,
        description: "Do Laundry",
        subtasks: [
          {
            id: "2",
            checked: true,
            description: "Pick up the clothes",
          },
        ],
        expanded: false,
      },
      {
        id: "3",
        checked: false,
        description: "Do Something else",
        subtasks: [],
        expanded: false,
      },
    ],
  },
});
