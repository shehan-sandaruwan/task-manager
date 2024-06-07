"use client";
import { useContext } from "react";
import Button from "../Button";
import { TaskContext } from "@/app/context";
import { Task } from "@/app/lib/type";
import { toast } from "react-toastify";

type CreateTaskActionProps = {
  isEdit: boolean;
  editedTask: Task | null;
};

export default function CreateTaskAction({
  isEdit,
  editedTask,
}: CreateTaskActionProps) {
  const { tasks, setTasks, setIsOpenModal, setEditTask } =
    useContext(TaskContext);

  const handleTaskActionChange = (action: string) => {
    switch (action) {
      case "cancel":
        setIsOpenModal(false);
        setEditTask(null);
        break;
      case "save":
        const newTasks = tasks.map((task: Task) => {
          if (task.id === editedTask?.id) {
            return editedTask;
          }
          return task;
        });
        setTasks(newTasks);
        toast.success("Task updated successfully");
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        setEditTask(null);
        setIsOpenModal(false);
        break;
    }
  };

  return (
    <div className="flex gap-4 items-end self-end mb-4  bottom-0">
      <Button
        styles="bg-gray-200 text-gray-500"
        onClickHandler={() => handleTaskActionChange("cancel")}
      >
        Cancel
      </Button>
      {isEdit ? (
        <Button
          styles="bg-green-500 text-white"
          onClickHandler={() => handleTaskActionChange("save")}
          testId={"save-task"}
        >
          Save
        </Button>
      ) : (
        <input
          className="bg-green-400 text-white py-4 px-8 rounded-2xl border-2 cursor-pointer`"
          type="submit"
          value={"Create"}
          data-testid={"create-task"}
        />
      )}
    </div>
  );
}
