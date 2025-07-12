import { Box, Button, Stack } from "@mui/material";
import HeadingTitle from "../components/shared/HeadingTitle";
import TableContent from "../components/shared/TableContent";
import {
  useGetAnnouncementsQuery,
  useDeleteAnnouncementMutation,
} from "../store/services/announcement.api.slice";

export default function Announcement() {
  const { data: announcements } = useGetAnnouncementsQuery({
    page: 1,
  });

  const [destroyAnnouncement, { isLoading: isDestroyLoading, isSuccess }] =
    useDeleteAnnouncementMutation();
  console.log(isDestroyLoading);
  console.log(isSuccess);
  return (
    <Box component={"section"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HeadingTitle title="Announcements" />
        <Button color="secondary" variant="contained">
          Create
        </Button>
      </Stack>
      <TableContent
        data={announcements?.data.announcements || []}
        onDelete={destroyAnnouncement}
      />
    </Box>
  );
}
