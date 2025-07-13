import { Box } from "@mui/material";
import DashBox from "../components/ui/dashbaord/DashBox";
import DashAnnouncement from "../components/ui/dashbaord/DashAnnouncement";
import PageHead from "../components/shared/PageHead";

export default function Dashbaord() {
  return (
    <>
      <PageHead title="Dashboard" description="Dashboard" />
      <Box component={"section"}>
        <DashBox />
        <DashAnnouncement />
      </Box>
    </>
  );
}
