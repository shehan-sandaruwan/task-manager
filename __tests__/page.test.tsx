import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../app/page";
import TMTable from "@/app/ui/TMTable";
import { tasks } from "@/mock";
import { columnHeaders } from "@/app/lib/constant";
import TaskContextProvider from "@/app/lib/taskContex";
import { act } from "react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByText("Simple Task Manager");
    expect(heading).toBeInTheDocument();
  });

  it("render correct data", () => {
    const { container, getByText } = render(
      <TaskContextProvider value={{ tasks, setTasks: () => {} }}>
        <TMTable columnHeaders={columnHeaders} data={tasks} isLoading={false} />
      </TaskContextProvider>
    );
    const rows = container.querySelectorAll("tbody tr");
    // Check the number of rows
    expect(rows.length).toBe(4);
    // Check the content of each row
    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
    expect(getByText("Task 3")).toBeInTheDocument();
    expect(getByText("Task 4")).toBeInTheDocument();
  });

  it("should add new task", async () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    render(
      <TaskContextProvider
        value={{
          tasks,
        }}
      >
        <Page />
      </TaskContextProvider>
    );
    const newTask = {
      id: 5,
      title: "New Task",
      description: "This is a new task",
      dateTime: "2025-01-01T09:18",
      status: "Active",
    };
    await waitFor(() => screen.getByText("Task 1"), {
      timeout: 3500,
    });

    const button = screen.getByTestId("add-task");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add Task");
    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => screen.getByText("Create Task"));
    expect(screen.getByText("Create Task")).toBeInTheDocument();

    const titleInput = screen.getByTestId("title");
    const descriptionInput = screen.getByTestId("description");
    const dateTimeInput = screen.getByTestId("dateTime");

    act(() => {
      fireEvent.change(titleInput, { target: { value: newTask.title } });
      fireEvent.change(descriptionInput, {
        target: { value: newTask.description },
      });
      fireEvent.change(dateTimeInput, { target: { value: newTask.dateTime } });
    });
    // Click on submit button
    const submitButton = screen.getByTestId("create-task");
    expect(submitButton).toBeInTheDocument();
    act(() => {
      fireEvent.submit(submitButton);
    });
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("should edit task", async () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(
      <TaskContextProvider
        value={{
          tasks,
        }}
      >
        <Page />
      </TaskContextProvider>
    );
    await waitFor(() => screen.getByText("Task 1"), {
      timeout: 3500,
    });
    // Click on edit button
    const editButtons = screen.getAllByTestId("edit-task");
    expect(editButtons[0]).toBeInTheDocument();
    act(() => {
      fireEvent.click(editButtons[0]);
    });
    // Check if the modal is open
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    // Check if the title input is in the document
    const titleInput = screen.getByTestId("title");
    expect(titleInput).toBeInTheDocument();
    // Check if the description input is in the document
    const descriptionInput = screen.getByTestId("description");
    expect(descriptionInput).toBeInTheDocument();
    // Check if the dateTime input is in the document
    const dateTimeInput = screen.getByTestId("dateTime");
    expect(dateTimeInput).toBeInTheDocument();

    // Change the title input value
    act(() => {
      fireEvent.change(titleInput, { target: { value: "Edited Title" } });
    });

    const saveButton = screen.getByTestId("save-task");
    expect(saveButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(saveButton);
    });
    expect(screen.getByText("Edited Title")).toBeInTheDocument();
  });
});
