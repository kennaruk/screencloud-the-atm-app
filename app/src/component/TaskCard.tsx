import React, { useState } from "react";
import useTodo from "../hooks/useTodo";

import { Task, Todo } from "../model/todo/todo.d";

const chevronDownSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const chevronUpSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface ITaskCardProps {
  task: Todo | Task;
  onChecked: () => void;
  showExpandedOption?: boolean;
  onExpanded?: () => void;
}

const TaskCard: React.FC<ITaskCardProps> = ({
  task,
  onChecked,
  showExpandedOption = true,
  onExpanded,
  ...rest
}) => {
  return (
    <div {...rest} className="w-full flex flex-col items-center">
      <div
        style={{ marginBottom: "2px solid black" }}
        className="w-full py-6 border border-black flex items-center relative"
      >
        <input
          type="checkbox"
          className="form-checkbox mx-2"
          onClick={onChecked}
        />
        {task.description}

        {showExpandedOption && (
          <SubtaskExpandedOption task={task} onExpanded={onExpanded} />
        )}
      </div>
      {showExpandedOption && <SubtaskList task={task} />}
    </div>
  );
};

interface SubtaskExpandedOptionProps {
  task: Todo | Task;
  onExpanded?: () => void;
}
const SubtaskExpandedOption: React.FC<SubtaskExpandedOptionProps> = ({
  task,
  onExpanded,
}) => {
  if (!("subtasks" in task)) {
    return <></>;
  }
  const checkedCount = task.subtasks.filter((task) => task.checked).length;

  return (
    <div
      className="absolute right-0 bottom-0 p-2 flex items-center text-gray-600 text-xs cursor-pointer"
      onClick={onExpanded}
    >
      <span>
        {checkedCount} of {task.subtasks.length} completed
      </span>
      {task.expanded ? chevronDownSVG : chevronUpSVG}
    </div>
  );
};

interface SubtaskList {
  task: Todo | Task;

  onChecked?: () => void;
}
const SubtaskList: React.FC<SubtaskList> = ({ task }) => {
  const { createSubtask, onCheckTask } = useTodo();
  const [newSubtaskInput, setNewSubtaskInput] = useState<string>("");

  if (!("subtasks" in task)) {
    return <></>;
  }
  if (!task.expanded) {
    return <></>;
  }

  const onNewSubtask = () => {
    if (newSubtaskInput === "") {
      return;
    }

    createSubtask(newSubtaskInput, task.id);
    setNewSubtaskInput("");
  };

  return (
    <div className="w-2/3">
      {task.subtasks.map((subtask) => (
        <TaskCard
          key={subtask.id}
          onChecked={() => {
            onCheckTask(subtask.id);
          }}
          task={subtask}
        />
      ))}
      <div className="w-full border border-black py-3 flex items-center">
        <input
          className="w-full py-3"
          type="text"
          placeholder="What are the steps?"
          value={newSubtaskInput}
          onChange={(e) => {
            setNewSubtaskInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") {
              return;
            }
            onNewSubtask();
          }}
        ></input>
        <button
          className="bg-gray-200 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded border-2 border-black leading-tight whitespace-nowrap"
          onClick={onNewSubtask}
        >
          New Step
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
