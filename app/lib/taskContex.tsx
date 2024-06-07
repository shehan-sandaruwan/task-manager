import { TaskContext } from "@/app/context";

type TaskContextProviderProps = {
  children: React.ReactNode;
  value: any;
};
const TaskContextProvider = ({ children, value }: TaskContextProviderProps) => {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
