import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import TableContent from "../components/shared/TableContent";
import {
  useGetAnnouncementsQuery,
  useDeleteAnnouncementMutation,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
} from "../store/services/announcement.api.slice";
import CrudModel from "../components/shared/CrudModel";
import HeadingTable from "../components/shared/HeadingTable";
import PageHead from "../components/shared/PageHead";

export default function Announcement() {
  const [open, setOpen] = useState<boolean>(false);

  const { data: announcements, isLoading: loadingAnnouncements } =
    useGetAnnouncementsQuery({
      page: 1,
    });

  const [createAnnouncement] = useCreateAnnouncementMutation();

  const [destroyAnnouncement] = useDeleteAnnouncementMutation();

  const [updateAnnouncement] = useUpdateAnnouncementMutation();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreateSubmit = useCallback(
    async (data: { content: string; postedby: string }) => {
      try {
        await createAnnouncement(data).unwrap();
        handleClose();
      } catch (err) {
        console.error(err);
      }
    },
    [createAnnouncement, handleClose]
  );

  return (
    <>
      <PageHead title="Announcement" description="Announcement" />
      <Box component={"section"}>
        <HeadingTable onclick={handleClickOpen} title={"Announcement"} />
        <CrudModel
          open={open}
          handleClose={handleClose}
          title="Add Announcement"
          handlingSubmit={handleCreateSubmit}
        />
        <TableContent
          data={announcements?.data.announcements || []}
          onDelete={destroyAnnouncement}
          onEdit={updateAnnouncement}
          isLoading={loadingAnnouncements}
        />
      </Box>
    </>
  );
}
