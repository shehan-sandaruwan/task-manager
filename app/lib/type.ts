export type Task = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  status: "Active" | "Completed";
};
