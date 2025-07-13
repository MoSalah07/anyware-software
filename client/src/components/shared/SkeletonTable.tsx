import React from "react";
import { TableRow, TableCell, Skeleton } from "@mui/material";
import type { TableCellProps } from "@mui/material";

interface Column {
  id: string;
  label: string;
  align?: TableCellProps["align"];
}

const columns: Column[] = [
  { id: "avatar", label: "Avatar", align: "center" },
  { id: "postedby", label: "Posted By", align: "left" },
  { id: "content", label: "Content", align: "left" },
  { id: "createdAt", label: "Created At", align: "right" },
  { id: "action", label: "Action", align: "right" },
];

interface SkeletonTableProps {
  rows?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow data-testid="skeleton-row" key={index}>
          {columns.map((column) => (
            <TableCell key={column.id} align={column.align ?? "left"}>
              <Skeleton variant="rectangular" height={20} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTable;
