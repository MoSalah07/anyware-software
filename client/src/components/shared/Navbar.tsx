import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { teal } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthSwitcher from "./AuthSwitcher";
import { Stack } from "@mui/material";

export default function Navbar() {
  const { t } = useTranslation();

  const buttonStyles = {
    color: "white",
    mx: 1,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.15)",
      color: "white",
    },
  };

  return (
    <AppBar position="relative" sx={{ backgroundColor: teal[500] }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box>
          <Button sx={buttonStyles}>
            <NavLink style={{ color: "white" }} to="/" end>
              {t("home")}
            </NavLink>
          </Button>
          <Button sx={buttonStyles}>
            <NavLink style={{ color: "white" }} to={`/dashboard`}>
              {t("dashboard")}
            </NavLink>
          </Button>
        </Box>
        <Stack direction={"row"} alignItems={"center"} columnGap={2}>
          <LanguageSwitcher />
          <AuthSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
