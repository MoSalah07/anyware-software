import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      gradients: {
        secondary: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      gradients?: {
        secondary?: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B00",
    },
    secondary: {
      main: "#397B94",
    },
    info: {
      main: "#83f1e4",
    },
  },
  custom: {
    gradients: {
      secondary:
        "linear-gradient(90deg, rgba(45,137,173,1) 0%, rgba(87,199,133,1) 85%)",
    },
  },
});

export default theme;
