import { Button, Stack } from "@mui/material";
import HeadingTitle from "./HeadingTitle";

export default function HeadingTable({
  title,
  onclick,
}: {
  title: string;
  onclick: () => void;
}) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <HeadingTitle title={title} />
      <Button color="secondary" variant="contained" onClick={onclick}>
        Create
      </Button>
    </Stack>
  );
}
