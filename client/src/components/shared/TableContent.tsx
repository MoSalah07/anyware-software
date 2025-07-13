import React, { useState, useMemo, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import type { IAnnouncement } from "../../interfaces";
import SkeletonTable from "./SkeletonTable";
import CrudModel from "./CrudModel";
import DeleteModel from "./DeleteModel";
import ActionButtons from "./ActionButtons";
import { grey } from "@mui/material/colors";

interface Column {
  id: "avatar" | "postedby" | "content" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: readonly Column[] = [
  { id: "avatar", label: "Avatar", minWidth: 100, align: "center" },
  { id: "postedby", label: "Posted By", minWidth: 120 },
  { id: "content", label: "Content", minWidth: 200, align: "left" },
  { id: "createdAt", label: "Created At", minWidth: 150, align: "right" },
  { id: "action", label: "Action", minWidth: 150, align: "right" },
];

interface IProps {
  data: IAnnouncement[];
  onDelete: (id: string) => void;
  onEdit: (input: {
    id: string;
    body: { content: string; postedby: string };
  }) => void;
  isLoading: boolean;
}

type ModalType = "edit" | "delete" | null;

export default function TableContent({
  data,
  onDelete,
  onEdit,
  isLoading,
}: IProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalState, setModalState] = useState<{
    type: ModalType;
    data: IAnnouncement | null;
  }>({ type: null, data: null });

  const visibleRows = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const handleChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    []
  );

  const openModal = useCallback((type: ModalType, row: IAnnouncement) => {
    setModalState({ type, data: row });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: null });
  }, []);

  const handleSubmit = useCallback(
    async (formData: { content: string; postedby: string }) => {
      if (!modalState.data) return;
      try {
        onEdit({ id: modalState.data._id, body: formData });
        closeModal();
      } catch (err) {
        console.error(err);
      }
    },
    [modalState, onEdit, closeModal]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {modalState.type === "edit" && modalState.data && (
          <CrudModel
            handleClose={closeModal}
            open={true}
            handlingSubmit={handleSubmit}
            title="Edit Announcement"
            defaultValues={{
              content: modalState.data.content,
              postedby: modalState.data.postedby,
            }}
          />
        )}

        {modalState.type === "delete" && modalState.data && (
          <DeleteModel
            handleClose={closeModal}
            open={true}
            onDelete={() => {
              onDelete(modalState.data!._id);
              closeModal();
            }}
            defaultValue={modalState.data}
          />
        )}

        <Table stickyHeader aria-label="announcement table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? "left"}
                  style={{ minWidth: column.minWidth }}
                  sx={{ color: grey[600], fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <SkeletonTable
                rows={5}
                columns={columns.length - 1}
                withActions
              />
            ) : (
              visibleRows.map((row) => (
                <TableRow hover tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    let value: React.ReactNode = "";

                    switch (column.id) {
                      case "avatar":
                        value = (
                          <Avatar
                            alt={row.postedby}
                            sx={{ width: 40, height: 40, mx: "auto" }}
                          />
                        );
                        break;
                      case "postedby":
                        value = row.postedby;
                        break;
                      case "content":
                        value = row.content;
                        break;
                      case "createdAt":
                        value = dayjs(row.createdAt).format(
                          "DD MMM YYYY, hh:mm A"
                        );
                        break;
                      case "action":
                        value = (
                          <ActionButtons
                            onEditClick={() => openModal("edit", row)}
                            onDeleteClick={() => openModal("delete", row)}
                          />
                        );
                        break;
                    }

                    return (
                      <TableCell key={column.id} align={column.align ?? "left"}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
