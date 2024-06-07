import CreateTaskAction from "../CreateTaskAction";
import { FormEvent, useEffect, useState } from "react";
import { Task } from "@/app/lib/type";
import { generateUniqueId } from "@/app/lib/utils";

type CreateTaskFormProps = {
  createTaskHandler: (data: Task) => void;
  editTask: Task | null;
};

export default function CreateTaskForm({
  createTaskHandler,
  editTask,
}: CreateTaskFormProps) {
  const [taskData, setTaskData] = useState<Task>({
    id: "",
    title: "",
    description: "",
    dateTime: "",
    status: "Active",
  });

  useEffect(() => {
    if (editTask) {
      setTaskData(editTask);
    }
  }, [editTask]);

  const handleChange = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    const { name, value } = event.target as HTMLInputElement;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const unique_id = generateUniqueId();
    console.log(unique_id);
    const _newTaskData = { ...taskData, id: unique_id };
    createTaskHandler(_newTaskData);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label htmlFor="title" className="text-xl font-semibold">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        data-testid="title"
        placeholder="Enter task title"
        className="bg-gray-200 p-6"
        value={taskData.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="description" className="text-xl font-semibold">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Enter task description"
        data-testid="description"
        rows={4}
        value={taskData.description}
        className="bg-gray-200 p-6"
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="dateTime" className="text-xl font-semibold">
        Date & Time
      </label>
      <input
        type="datetime-local"
        id="dateTime"
        data-testid="dateTime"
        name="dateTime"
        className="bg-gray-200 p-6"
        value={taskData.dateTime}
        onChange={handleChange}
        required
      />
      <label htmlFor="status" className="text-xl font-semibold">
        Status
      </label>
      <select
        value={taskData.status}
        onChange={handleChange}
        className="bg-gray-200 p-2"
        name="status"
      >
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>

      <CreateTaskAction isEdit={!!editTask} editedTask={taskData} />
    </form>
  );
}
