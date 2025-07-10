import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setLoginStatus } from "../../store/authSlice";

export default function AuthSwitcher() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Button
      onClick={() => dispatch(setLoginStatus(!isLoggedIn))}
      variant="contained"
      type="button"
      sx={{ backgroundColor: teal[400] }}
    >
      {isLoggedIn ? t("logout") : t("login")}
    </Button>
  );
}
