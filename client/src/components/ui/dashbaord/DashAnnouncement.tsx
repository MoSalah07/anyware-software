import { Box, Stack, Typography } from "@mui/material";
import HeadingTitle from "../../shared/HeadingTitle";
import { Link } from "react-router-dom";
import AnnouncementCard from "./AnnouncementCard";
import { useGetAnnouncementsQuery } from "../../../store/services/announcement.api.slice";
export default function DashAnnouncement() {
  useGetAnnouncementsQuery({
    page: 1,
  });

  return (
    <Box
      component={"div"}
      sx={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
        backgroundColor: "white",
        p: 2,
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HeadingTitle title="Announcements" />
        <Link to={`/dashboard/announcement`}>
          <Typography
            variant="body2"
            color="info"
            fontWeight={"bold"}
            fontSize={"1rem"}
            textTransform={"capitalize"}
            sx={{ cursor: "pointer" }}
          >
            all
          </Typography>
        </Link>
      </Stack>

      <Box sx={{ pt: 2, borderTop: "1px solid #ccc" }}>
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </Box>
    </Box>
  );
}
