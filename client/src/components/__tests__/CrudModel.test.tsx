import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CrudModel from "../shared/CrudModel";

describe("CrudModel", () => {
  const mockSubmit = vi.fn();
  const mockClose = vi.fn();

  const defaultValues = {
    content: "Test Content",
    postedby: "John Doe",
  };

  beforeEach(() => {
    mockSubmit.mockReset();
    mockClose.mockReset();
  });

  it("renders form inputs correctly", () => {
    render(
      <CrudModel
        open={true}
        handleClose={mockClose}
        title="Test Title"
        handlingSubmit={mockSubmit}
        defaultValues={defaultValues}
      />
    );

    expect(screen.getByLabelText(/Content/i)).toHaveValue("Test Content");
    expect(screen.getByLabelText(/Posted By/i)).toHaveValue("John Doe");
  });

  it("shows validation error if fields are empty", async () => {
    render(
      <CrudModel
        open={true}
        handleClose={mockClose}
        title="Add"
        handlingSubmit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText(/Save changes/i));

    expect(await screen.findByText(/Content is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Posted by is required/i)
    ).toBeInTheDocument();
  });

  it("calls handlingSubmit on valid form submit", async () => {
    render(
      <CrudModel
        open={true}
        handleClose={mockClose}
        title="Edit"
        handlingSubmit={mockSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: "New content" },
    });
    fireEvent.change(screen.getByLabelText(/Posted By/i), {
      target: { value: "Ali" },
    });

    fireEvent.click(screen.getByText(/Save changes/i));

    // انتظر حتى يتأكد أن القيمة ظهرت (يضمن انتهاء المعالجة async)
    await screen.findByDisplayValue("New content");

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls[0][0]).toMatchObject({
      content: "New content",
      postedby: "Ali",
    });
  });

  it("calls handleClose when cancel button is clicked", () => {
    render(
      <CrudModel
        open={true}
        handleClose={mockClose}
        title="Test"
        handlingSubmit={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockClose).toHaveBeenCalled();
  });

  it("calls handleClose when close icon is clicked", () => {
    render(
      <CrudModel
        open={true}
        handleClose={mockClose}
        title="Test"
        handlingSubmit={mockSubmit}
      />
    );

    const closeIcon = screen.getByLabelText("close");
    fireEvent.click(closeIcon);
    expect(mockClose).toHaveBeenCalled();
  });
});
