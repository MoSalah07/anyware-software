import { Avatar, Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { IAnnouncement } from "../../../interfaces";
import dayjs from "dayjs";

interface IProps {
  announcement: IAnnouncement;
}

export default function AnnouncementCard({ announcement }: IProps) {
  const value = dayjs(announcement.createdAt).format("DD MMM YYYY, hh:mm A");

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent={{ xs: "flex-start", md: "space-between" }}
      gap={2}
      py={1}
      borderBottom={"2px solid #ccc"}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexBasis: { xs: "100%", md: "25%" },
          borderRight: { xs: "none", md: "2px solid #397B94" },
          // borderBottom: { xs: "1px solid #397B94", md: "none" },
          width: "100%",
          pb: { xs: 2, md: 0 },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "1px",
            backgroundColor: "#397B94",
            display: { xs: "block", md: "none" },
          },
        }}
      >
        <Avatar alt="Remy Sharp" />
        <Stack>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            color={grey[600]}
            fontSize={{ xs: ".8rem", md: "1rem" }}
            textTransform={"capitalize"}
          >
            {announcement.postedby}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            fontSize={{ xs: ".6rem", md: ".8rem" }}
            color={grey[500]}
          >
            {value}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ flexBasis: { xs: "100%", md: "75%" } }}>
        <Typography
          variant="body1"
          component={"p"}
          color={grey[500]}
          fontSize={{ xs: ".75rem", md: "1rem" }}
          fontWeight={{ xs: "bold", md: "normal" }}
          lineHeight={1.5}
        >
          {announcement.content}
        </Typography>
      </Box>
    </Stack>
  );
}
