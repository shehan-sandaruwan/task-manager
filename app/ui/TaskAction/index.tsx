import { IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import Button from "../Button";
import { ACTIVE_STATUS } from "@/app/lib/constant";
import { Task } from "@/app/lib/type";
import { useContext } from "react";
import { TaskContext } from "@/app/context";
import { toast } from "react-toastify";

type TaskActionProps = {
  task: Task;
};
export default function TaskAction({ task }: TaskActionProps) {
  const { tasks, setTasks, setIsOpenModal, setEditTask } =
    useContext(TaskContext);

  const onActionBtnClickHandler = (action: "edit" | "delete") => {
    switch (action) {
      case "edit":
        setIsOpenModal(true);
        setEditTask(task);
        break;
      case "delete":
        const newTasks = tasks.filter((_task: Task) => _task.id !== task.id);
        setTasks(newTasks);
        toast.success("Task deleted successfully");
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        break;
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {task.status === ACTIVE_STATUS && (
        <Button
          styles="bg-green-500"
          testId="edit-task"
          onClickHandler={() => onActionBtnClickHandler("edit")}
        >
          <IoPencilSharp width={32} height={32} />
        </Button>
      )}
      <Button
        styles="bg-red-500"
        onClickHandler={() => onActionBtnClickHandler("delete")}
      >
        <IoTrashOutline width={32} height={32} />
      </Button>
    </div>
  );
}
