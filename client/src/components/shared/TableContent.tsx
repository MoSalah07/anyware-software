import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { IAnnouncement } from "../../interfaces";
import { IconButton } from "@mui/material";

interface Column {
  id: "avatar" | "postedby" | "content" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: readonly Column[] = [
  { id: "avatar", label: "Avatar", minWidth: 100, align: "center" },
  { id: "postedby", label: "Posted By", minWidth: 120 },
  {
    id: "content",
    label: "Content",
    minWidth: 200,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 150,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 150,
    align: "right",
  },
];

interface IProps {
  data: IAnnouncement[];
  onDelete: (id: string) => void;
}

export default function TableContent({ data, onDelete }: IProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    let value;

                    switch (column.id) {
                      case "avatar":
                        value = (
                          <Avatar
                            alt={row.postedby}
                            // src={row.avatar ?? ""}
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
                        value = new Date(row.createdAt).toLocaleString();
                        break;
                      case "action":
                        value = (
                          <>
                            <IconButton
                              onClick={() => console.log("Edit", row._id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => onDelete(row._id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        );
                        break;
                      default:
                        value = "";
                    }

                    return (
                      <TableCell key={column.id} align={column.align ?? "left"}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
