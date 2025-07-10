import { Outlet } from "react-router-dom";
import DashbaordNavbar from "../components/ui/DashbaordNavbar";
import { Box, Grid } from "@mui/material";
import DashbaordSidebar from "../components/ui/DashbaordSidebar";

export default function DashboardLayout() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ height: "100%" }}
      >
        <Grid size={2} sx={{ borderRight: "1px solid #ccc", height: "100%" }}>
          <DashbaordSidebar />
        </Grid>
        <Grid size={10}>
          <section className="bg-red-500">
            <DashbaordNavbar />
            <Outlet />
          </section>
        </Grid>
      </Grid>
    </Box>
  );
}
