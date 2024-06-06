import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// Create a QueryClient instance
const queryClient = new QueryClient();

describe("Header component", () => {
  test("renders Header and opens modal on button click", () => {
    render(
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
        </QueryClientProvider>
      </ChakraProvider>
    );

    // Check if the heading is rendered
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();

    // Check if the button is rendered and clickable
    const button = screen.getAllByText(/Add New Task \+/i);
    expect(button).toBeInTheDocument();
    button.forEach((element) => {
      fireEvent.click(element);
    });

    // Check if the modal is opened
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });
});
