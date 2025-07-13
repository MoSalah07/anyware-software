import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { teal } from "@mui/material/colors";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthSwitcher from "./AuthSwitcher";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function DrawerNavMob({ open, toggleDrawer }: Props) {
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

  const DrawerList = (
    <Box
      sx={{ width: 250, bgcolor: teal[700], height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          p: 2,
        }}
      >
        <ListItem disablePadding>
          <LanguageSwitcher />
        </ListItem>
        <ListItem disablePadding>
          <AuthSwitcher />
        </ListItem>
        <ListItem disablePadding>
          <Button sx={buttonStyles}>
            <NavLink style={{ color: "white" }} to="/" end>
              {t("home")}
            </NavLink>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button sx={buttonStyles}>
            <NavLink style={{ color: "white" }} to={`/dashboard`}>
              {t("dashboard")}
            </NavLink>
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
