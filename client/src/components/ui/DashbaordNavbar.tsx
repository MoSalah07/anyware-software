import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import Search from "./Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import IconWithBadge from "../shared/IconWithBadge";
import AccountMenu from "./dashbaord/AccountMenu";

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
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Hello Admin
          </Typography>

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
    </AppBar>
  );
}
