import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function HeadingTitle({
  title = "Announcements",
}: {
  title: string;
}) {
  return (
    <Typography
      variant="h2"
      component={"h2"}
      my={2}
      fontWeight={"550"}
      fontSize={{ xs: ".85rem", md: "1.1rem", lg: "1.4rem" }}
      letterSpacing={"1px"}
      sx={{ color: grey[700] }}
    >
      {title}
    </Typography>
  );
}
