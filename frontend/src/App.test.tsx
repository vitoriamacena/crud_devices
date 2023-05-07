import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders 'Novo dispositivo' button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Novo dispositivo/i);
  expect(buttonElement).toBeInTheDocument();
});