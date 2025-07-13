import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// Icons
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import CampaignIcon from "@mui/icons-material/Campaign";

const navItems = [
  { label: "Dashboard", icon: <HomeIcon />, to: "/dashboard" },
  { label: "Quiz", icon: <QuizIcon />, to: "/dashboard/quiz" },
  {
    label: "Announcement",
    icon: <CampaignIcon />,
    to: "/dashboard/announcement",
  },
];

export default function DashbaordSidebar({
  isMobile,
  toggleDrawer,
}: {
  isMobile?: boolean;
  toggleDrawer?: (newOpen: boolean) => () => void;
}) {
  const location = useLocation();

  return (
    <Box
      component="aside"
      sx={{
        width: isMobile ? { xs: "200px", sm: "280px" } : "100%",
        height: "100vh",
        borderRight: "1px solid #ddd",
        background: "linear-gradient(to bottom, #13577C 0%, #357C92 100%)",
        color: "white",
        p: 0.5,
      }}
    >
      <Box component={"div"} sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            my: 2,
            fontSize: {
              xs: "1rem",
              sm: "1.4rem",
              md: "1.5rem",
              lg: "1.8rem",
            },
            letterSpacing: {
              xs: "0.5px",
              sm: "1px",
              md: "2px",
            },
          }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Coligo
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            onClick={
              isMobile && toggleDrawer ? () => toggleDrawer(false)() : undefined
            }
            selected={location.pathname === item.to}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "white",
                color: "info.main",
                fontWeight: "700",
                "& .MuiSvgIcon-root": {
                  color: "secondary.main",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{ color: "inherit", minWidth: { md: 30, lg: 50 } }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight:
                      location.pathname === item.to ? "700" : "normal",
                    fontSize: {
                      md: "0.85rem",
                      lg: "1rem",
                      xl: "1.2rem",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
