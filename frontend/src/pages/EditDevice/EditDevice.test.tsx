import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateDevice from "./EditDevide";
import userEvent from "@testing-library/user-event";

describe("CreateDevice", () => {
  it("should render the DeviceForm component", () => {
    render(
      <MemoryRouter>
        <CreateDevice />
      </MemoryRouter>
    );
    expect(screen.getByText(/editar dispositivo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
  });

  it("should navigate back to the home page when the Voltar button is clicked", async () => {

    render(
        <MemoryRouter>
          <CreateDevice />
        </MemoryRouter>
      );
    const backButton = screen.getByRole("button", { name: /voltar/i });
    userEvent.click(backButton);

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Serial")).toBeInTheDocument();
    expect(screen.getByText("MAC Address")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
  });
});