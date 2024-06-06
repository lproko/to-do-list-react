import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import '@testing-library/jest-dom'
import TaskModal from "./TaskModal";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock API calls
jest.mock("../api", () => ({
  createTask: jest.fn().mockResolvedValue({ title: "Test Task" }),
  updateTask: jest.fn().mockResolvedValue({ title: "Updated Task" }),
  fetchTasksbyId: jest.fn().mockResolvedValue({
    title: "Existing Task",
    description: "Existing Description",
    category: "Existing Category",
    assignee: "Existing Assignee",
    priority: 1,
    completed: new Date(),
    status: 0,
  }),
}));

const queryClient = new QueryClient();

describe("TaskModal component", () => {
  test("renders TaskModal and submits form", async () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <TaskModal
            isOpen={true}
            onClose={jest.fn()}
            refetch={jest.fn()}
            edit={false}
            id=""
          />
        </QueryClientProvider>
      </ChakraProvider>
    );

    // Check if the modal elements are rendered
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    const titleInput = screen.getByPlaceholderText(/Task name/i);
    const descriptionInput = screen.getByPlaceholderText(/Describe the task/i);

    // Fill the form and submit
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the mock API call
    await waitFor(() =>
      expect(screen.getByText(/Task Created Successfully/i)).toBeInTheDocument()
    );
  });
});
