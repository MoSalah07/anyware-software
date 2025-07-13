import { Box, Button, Container, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Box>
      <Box
        sx={{
          bgcolor: teal[700],
          py: 10,
          color: "#fff",
          textAlign: "center",
          height: { xs: "92.8vh", sm: "91.78vh" },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {t("welcome")}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Build modern apps with React and MUI
          </Typography>
          <Typography variant="body1" gutterBottom>
            anyware-software Challenge
          </Typography>
          <Button variant="contained" color="info">
            {t("getStarted")}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
