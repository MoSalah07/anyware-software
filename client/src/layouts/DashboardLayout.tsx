import { Outlet } from "react-router-dom";
import DashbaordNavbar from "../components/ui/DashbaordNavbar";
import { Box, Container, Grid } from "@mui/material";
import DashbaordSidebar from "../components/ui/DashbaordSidebar";

export default function DashboardLayout() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 0, sm: 0, md: 2, lg: 2, xl: 2 }}
          sx={{
            borderRight: "1px solid #ccc",
            height: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <DashbaordSidebar />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 10, lg: 10, xl: 10 }}>
          <Box component={"section"}>
            <DashbaordNavbar />
            <Container
              component={"div"}
              sx={{
                py: 4,
                backgroundColor: "#f5f5f5",
                height: "91.78vh",
                overflowY: "scroll",
              }}
            >
              <Outlet />
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
