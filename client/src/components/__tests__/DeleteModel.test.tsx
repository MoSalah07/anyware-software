import { render, screen, fireEvent } from "@testing-library/react";
import DeleteModel from "../shared/DeleteModel";
import { describe, it, expect, vi } from "vitest";
import { act } from "react";

const defaultValue = {
  _id: "123",
  content: "Test announcement content",
  postedby: "Admin",
};

const setup = (props = {}) => {
  const handleClose = vi.fn();
  const onDelete = vi.fn();
  const allProps = {
    open: true,
    handleClose,
    onDelete,
    defaultValue,
    ...props,
  };

  render(<DeleteModel {...allProps} />);
  return { handleClose, onDelete };
};

describe("DeleteModel Component", () => {
  it("should not render dialog when open is false", () => {
    render(
      <DeleteModel
        open={false}
        handleClose={vi.fn()}
        onDelete={vi.fn()}
        defaultValue={defaultValue}
      />
    );

    expect(
      screen.queryByText(/Are you sure you want to delete/i)
    ).not.toBeInTheDocument();
  });

  it("renders postedby and content correctly", () => {
    setup();

    expect(
      screen.getByText(/Are you sure you want to delete this announcement/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, node) => node?.textContent === "Posted By: Admin")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, node) => node?.textContent === "Content: Test announcement content"
      )
    ).toBeInTheDocument();
  });

  it("calls handleClose when Cancel is clicked", async () => {
    const { handleClose } = setup();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when Delete is clicked", async () => {
    const { onDelete } = setup();

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(defaultValue._id);
  });
});
