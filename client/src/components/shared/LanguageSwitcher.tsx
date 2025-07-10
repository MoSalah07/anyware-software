import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language || "en";

  const handleChange = (event: SelectChangeEvent) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        sx={{
          color: "gray",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          width: currentLang === "ar" ? "65%" : "fit-content",
          "&.Mui-focused": {
            color: "white",
          },
        }}
      >
        {t("lang")}
      </InputLabel>
      <Select
        sx={{
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "lightgray",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        value={currentLang}
        onChange={handleChange}
        label="Language"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ar">العربية</MenuItem>
      </Select>
    </FormControl>
  );
}
