import { Box, Grid, Stack, Typography } from "@mui/material";
import HeadingTitle from "../../shared/HeadingTitle";
import { Link } from "react-router-dom";

import { useGetAnnouncementsQuery } from "../../../store/services/announcement.api.slice";
import { useGetQuizzesQuery } from "../../../store/services/quiz.api.slice";
import type { IAnnouncement, IQuiz } from "../../../interfaces";
import AnnouncementSkeletonCard from "../../shared/AnnouncementSkeletonCard";
import InfoCard from "../../shared/InfoCard";
export default function DashAnnouncement() {
  const { data: announcements, isLoading: loadingAnnouncements } =
    useGetAnnouncementsQuery({
      page: 1,
      limit: 5,
    });

  const { data: quizzes, isLoading: loadingQuiz } = useGetQuizzesQuery({
    page: 1,
  });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 8, lg: 8 }}>
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
            {loadingAnnouncements
              ? Array.from({ length: 5 }).map((_, i) => (
                  <AnnouncementSkeletonCard key={i} />
                ))
              : announcements?.data.announcements.map((item: IAnnouncement) => (
                  <InfoCard key={item._id} type="announcement" data={item} />
                ))}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 4 }}>
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
            <HeadingTitle title="Quiz" />
            <Link to={`/dashboard/quiz`}>
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
            {loadingQuiz
              ? Array.from({ length: 5 }).map((_, i) => (
                  <AnnouncementSkeletonCard key={i} />
                ))
              : quizzes?.data.quizzes.map((item: IQuiz) => (
                  <InfoCard key={item._id} type="quiz" data={item} />
                ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
