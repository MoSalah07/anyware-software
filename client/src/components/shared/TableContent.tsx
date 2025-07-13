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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import type { IAnnouncement } from "../../interfaces";
import SkeletonTable from "./SkeletonTable";
import CrudModel from "./CrudModel";
import DeleteModel from "./DeleteModel";

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

export default function TableContent({
  data,
  onDelete,
  onEdit,
  isLoading,
}: IProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [defaultVal, setDefaultVal] = useState<IAnnouncement>(
    {} as IAnnouncement
  );

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

  const handleEditOpen = useCallback((row: IAnnouncement) => {
    setDefaultVal(row);
    setOpenEditModel(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setOpenEditModel(false);
  }, []);

  const handleDeleteOpen = useCallback((row: IAnnouncement) => {
    setDefaultVal(row);
    setOpenDeleteModel(true);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setOpenDeleteModel(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: { content: string; postedby: string }) => {
      try {
        onEdit({ id: defaultVal._id, body: data });
      } catch (err) {
        console.error(err);
      }
    },
    [defaultVal, onEdit]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <CrudModel
          handleClose={handleEditClose}
          open={openEditModel}
          handlingSubmit={handleSubmit}
          title="Edit Announcement"
          defaultValues={{
            content: defaultVal.content,
            postedby: defaultVal.postedby,
          }}
        />

        <DeleteModel
          handleClose={handleDeleteClose}
          open={openDeleteModel}
          onDelete={onDelete}
          defaultValue={defaultVal}
        />

        <Table stickyHeader aria-label="announcement table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <SkeletonTable rows={5} />
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
                          <>
                            <IconButton
                              aria-label="edit announcement"
                              onClick={() => handleEditOpen(row)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete announcement"
                              onClick={() => handleDeleteOpen(row)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
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
