import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CrudModel from "../shared/CrudModel";

describe("CrudModel", () => {
  const mockSubmit = vi.fn();
  const mockClose = vi.fn();

  beforeEach(() => {
    mockSubmit.mockReset();
    mockClose.mockReset();
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

    // تأكد من وجود الحقول قبل الضغط
    const contentInput = screen.getByLabelText(/Content/i);
    const postedByInput = screen.getByLabelText(/Posted By/i);
    expect(contentInput).toBeInTheDocument();
    expect(postedByInput).toBeInTheDocument();

    // تأكد من أن الحقول فارغة
    expect(contentInput).toHaveValue("");
    expect(postedByInput).toHaveValue("");

    // اضغط زر الحفظ بدون إدخال بيانات
    fireEvent.click(screen.getByText(/Save changes/i));

    // انتظر ظهور الرسائل
    await waitFor(() => {
      expect(screen.getByText(/Content is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Posted by is required/i)).toBeInTheDocument();
    });
  });
});
