import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import Search from "./Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import IconWithBadge from "../shared/IconWithBadge";
import AccountMenu from "./dashbaord/AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardSidebarMob from "./dashbaord/DashboardSidebarMob";

const NavbarContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const ToolbarSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export default function DashbaordNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "white",
        color: "gray",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Toolbar>
        <NavbarContainer>
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", display: { xs: "none", lg: "block" } }}
          >
            Hello Admin
          </Typography>

          <Button
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <MenuIcon />
          </Button>

          <ToolbarSection>
            <Search />
            <ToolbarSection>
              <IconWithBadge
                icon={<NotificationsIcon color="secondary" />}
                count={4}
              />
              <IconWithBadge icon={<EmailIcon color="secondary" />} count={3} />
              <AccountMenu />
            </ToolbarSection>
          </ToolbarSection>
        </NavbarContainer>
      </Toolbar>
      <DashboardSidebarMob open={open} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
}
