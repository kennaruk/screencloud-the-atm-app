export interface Task {
  id: string;
  description: string;
  checked: boolean;
}

export interface Todo extends Task {
  subtasks: Task[];
  expanded: boolean;
}
