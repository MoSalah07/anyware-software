import { Skeleton, TableRow, TableCell } from "@mui/material";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  withActions?: boolean;
  cellHeight?: number;
}

export default function SkeletonTable({
  rows = 5,
  columns = 5,
  withActions = false,
  cellHeight = 40,
}: SkeletonTableProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} data-testid="skeleton-row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={cellHeight}
              />
            </TableCell>
          ))}
          {withActions && (
            <TableCell
              align="center"
              sx={{ display: "flex", justifyContent: "center", gap: 1 }}
            >
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ mx: 0.5 }}
              />
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ mx: 0.5 }}
              />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}
