"use client";

import TMSelect from "../Select";
import Button from "../Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { ALL_STATUS } from "@/app/lib/constant";

type ActionPanelProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ActionPanel({ setIsOpenModal }: ActionPanelProps) {
  const handleAddTask = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="flex gap-4 md:self-end">
      <TMSelect defaultValue={ALL_STATUS} />
      <Button
        styles="bg-green-500"
        onClickHandler={handleAddTask}
        testId={"add-task"}
      >
        <div className="flex items-center justify-center">
          <IoAddCircleOutline /> <span className="ml-2">Add Task</span>
        </div>
      </Button>
    </div>
  );
}
