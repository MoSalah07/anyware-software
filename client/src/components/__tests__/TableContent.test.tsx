import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableContent from "../shared/TableContent";
import type { IAnnouncement } from "../../interfaces";
import { describe, it, vi, expect, beforeEach } from "vitest";

const mockData: IAnnouncement[] = Array.from({ length: 15 }, (_, i) => ({
  _id: `id-${i}`,
  title: `Title ${i}`,
  content: `This is announcement number ${i}`,
  postedby: `User ${i}`,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const mockOnDelete = vi.fn();
const mockOnEdit = vi.fn();

describe(" TableContent Component", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnEdit.mockClear();
  });

  it("renders the data correctly", () => {
    render(
      <TableContent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    );

    expect(
      screen.getByText("This is announcement number 0")
    ).toBeInTheDocument();
    expect(screen.getByText("User 0")).toBeInTheDocument();
  });

  it("shows Skeleton when isLoading is true", () => {
    render(
      <TableContent
        data={[]}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={true}
      />
    );

    const skeletonRows = screen.getAllByTestId("skeleton-row");
    expect(skeletonRows.length).toBeGreaterThan(0);
  });

  it("opens edit modal when Edit button is clicked", async () => {
    render(
      <TableContent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    );

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText(/Edit Announcement/i)).toBeInTheDocument();
    });
  });

  it("opens delete confirmation when Delete button is clicked", async () => {
    render(
      <TableContent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    );

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
    });
  });

  it("navigates to the next page", async () => {
    render(
      <TableContent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    );

    const nextPageButton = screen.getByLabelText("Go to next page");
    await userEvent.click(nextPageButton);

    await waitFor(() => {
      expect(
        screen.getByText("This is announcement number 10")
      ).toBeInTheDocument();
    });
  });

  it("changes rows per page to 25", async () => {
    render(
      <TableContent
        data={mockData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    );

    const rowsPerPageButton = screen.getByLabelText("Rows per page:");
    await userEvent.click(rowsPerPageButton);

    const option25 = await screen.findByRole("option", { name: "25" });
    await userEvent.click(option25);

    await waitFor(() => {
      expect(
        screen.getByText("This is announcement number 14")
      ).toBeInTheDocument();
    });
  });
});
