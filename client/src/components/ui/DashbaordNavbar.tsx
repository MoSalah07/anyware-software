import {
  AppBar,
  Avatar,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import Search from "./Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

export default function DashbaordNavbar() {
  const ToolbarSearch = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  });

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "white", color: "gray" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            sx={{ fontSize: "1rem" }}
          >
            Hello Admin
          </Typography>
          <ToolbarSearch>
            <Search />
            <ToolbarSearch>
              <NotificationsIcon />
              <EmailIcon />
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 25, height: 25, mb: 0.2 }}
              />
            </ToolbarSearch>
          </ToolbarSearch>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
