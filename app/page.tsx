"use client";
import ActionPanel from "./ui/ActionPanel";
import TMTable from "./ui/TMTable";
import Modal from "./ui/Modal";
import CreateTaskForm from "./ui/CreateTaskForm";
import { useEffect, useState } from "react";
import { Task } from "@/app/lib/type";
import { TaskContext } from "./context";
import { toast } from "react-toastify";
import { columnHeaders } from "./lib/constant";

export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const createTaskHandler = (data: Task) => {
    setIsOpenModal(false);
    toast.success("Task created successfully");
    setTasks([...tasks, data]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, data]));
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        const parsedTasks = JSON.parse(tasks);
        setTasks(parsedTasks);
      }

      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, setEditTask, setIsOpenModal }}
    >
      <main className="flex min-h-screen flex-col items-center justify-start gap-4">
        {isOpenModal && (
          <Modal title={editTask ? "Edit Task" : "Create Task"}>
            <CreateTaskForm
              createTaskHandler={createTaskHandler}
              editTask={editTask}
            />
          </Modal>
        )}
        <div className="container flex flex-col gap-4 items-center mt-10">
          <h1 className="text-3xl font-bold mb-20">Simple Task Manager</h1>
          <ActionPanel setIsOpenModal={setIsOpenModal} />
          <TMTable
            columnHeaders={columnHeaders}
            data={tasks}
            isLoading={isLoading}
          />
        </div>
      </main>
    </TaskContext.Provider>
  );
}
