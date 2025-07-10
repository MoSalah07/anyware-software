// components/ui/Sidebar.tsx
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <HomeIcon />, to: "/" },
  { label: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
  { label: "Settings", icon: <SettingsIcon />, to: "/settings" },
];

export default function DashbaordSidebar() {
  const location = useLocation();

  return (
    <Box
      component="aside"
      sx={{
        width: "100%",
        height: "100vh",
        borderRight: "1px solid #ddd",
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
