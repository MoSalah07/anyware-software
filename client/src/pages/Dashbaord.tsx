import { Box } from "@mui/material";
import DashBox from "../components/ui/dashbaord/DashBox";
import DashAnnouncement from "../components/ui/dashbaord/DashAnnouncement";

export default function Dashbaord() {
  return (
    <Box component={"section"}>
      <DashBox />
      <DashAnnouncement />
    </Box>
  );
}
