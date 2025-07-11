import { Box, Button, Stack } from "@mui/material";
import HeadingTitle from "../components/shared/HeadingTitle";
import TableContent from "../components/shared/TableContent";

export default function Announcement() {
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
      <TableContent data={[]} />
    </Box>
  );
}
