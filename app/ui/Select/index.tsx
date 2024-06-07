import React, { useContext } from "react";
import "./styles.scss";
import { TaskContext } from "@/app/context";
import { ALL_STATUS } from "@/app/lib/constant";
import { Task } from "@/app/lib/type";

const options = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
];

type TMSelectProps = {
  defaultValue: string;
};

export default function TMSelect({ defaultValue = ALL_STATUS }: TMSelectProps) {
  const { setTasks } = useContext(TaskContext);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks") as string)
      : [];
    if (value === ALL_STATUS) {
      setTasks(tasks);
    } else {
      const newTasks = tasks.filter((task: Task) => task.status === value);
      setTasks(newTasks);
    }
  };
  return (
    <select
      className="task-filter"
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
