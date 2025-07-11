import { Badge } from "@mui/material";
import type { SxProps } from "@mui/material";
import type { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  count: number;
  sx?: SxProps;
  badgeColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

export default function IconWithBadge({
  icon,
  count,
  sx,
  badgeColor = "info",
}: Props) {
  return (
    <Badge
      badgeContent={count}
      color={badgeColor}
      sx={{
        "& .MuiBadge-badge": {
          color: "white",
          fontSize: "0.7rem",
          padding: "0 5px",
        },
        ...sx,
      }}
    >
      {icon}
    </Badge>
  );
}
