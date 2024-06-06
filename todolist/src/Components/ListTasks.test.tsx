import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ListTasks from "./ListTasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// Mock API calls
jest.mock("../api", () => ({
  fetchTasks: jest.fn().mockResolvedValue([
    { id: "1", title: "Test Task 1", description: "Description 1", status: 0 },
    { id: "2", title: "Test Task 2", description: "Description 2", status: 1 },
    { id: "3", title: "Test Task 3", description: "Description 3", status: 2 },
  ]),
  deleteTasksbyId: jest.fn().mockResolvedValue(true),
}));

// Create a QueryClient instance
const queryClient = new QueryClient();

describe("ListTasks component", () => {
  test("renders ListTasks and displays tasks", async () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <ListTasks />
        </QueryClientProvider>
      </ChakraProvider>
    );

    // Check if the tasks are rendered
    expect(await screen.findByText(/Test Task 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Test Task 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/Test Task 3/i)).toBeInTheDocument();
  });

  test("searches tasks", async () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <ListTasks />
        </QueryClientProvider>
      </ChakraProvider>
    );

    // Search for a task
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: "Test Task 1" } });

    // Check if the filtered task is displayed
    expect(await screen.findByText(/Test Task 1/i)).toBeInTheDocument();
  });
});
