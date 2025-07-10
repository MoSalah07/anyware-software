import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  );
}
